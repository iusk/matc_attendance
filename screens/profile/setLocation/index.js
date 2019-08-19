import React from 'react';
import { View, Text } from 'react-native';
import { getDefaultLocationId, setDefaultLocationId } from '../../../data/asyncStorage';
import { getStudentsInfo } from '../../../data/mysqli/getInfo';
import { setDefaultLocationStudents } from '../../../data/redux';
import { connect } from 'react-redux';
import { LocationList } from '../../../components';
import styles from './styles';

class SetLocationScreen extends React.Component {
    static navigationOptions = {
        title: 'Set Current Location',
        headerStyle: {
            backgroundColor: '#d00000'
        },
        headerTintColor: '#fefdfa',
        headerTitleStyle: {
            color: '#fefdfa'
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            currentLocation: {'id': 0, 'name': 'No Location Found'},
            assignedLocations: []
        };

        this.checkAssignedLocation();
    }

    checkAssignedLocation = async () => {
        const defaultLocationId = await getDefaultLocationId();
        if (defaultLocationId) {
            const assignedLocations = this.props.locations.filter(obj => obj.id !== defaultLocationId);
            const currentLocation = this.props.locations.find(obj => {
                return obj.id === defaultLocationId;
            });
            this.setState({
                currentLocation: currentLocation,
                assignedLocations: assignedLocations
            });
        }        
    }

    setCurrentLocation = (id) => {
        setDefaultLocationId(id, this.checkAssignedLocation);
        getStudentsInfo(id, (response) => this.props.setDefaultLocationStudents(response));
    }

    render() {
        return (
            <React.Fragment>
                <View style={styles.wrapper}>
                    <Text style={styles.label}>Your current Location</Text>
                    <LocationList
                        id={this.state.currentLocation.id} 
                        name={this.state.currentLocation.name}
                        iconName='my-location'
                        onPress={() => {console.log('log')}}
                    />
                </View>
                <View style={styles.wrapper}>
                    <Text style={styles.label}>Other assigned Locations</Text>
                    {this.state.assignedLocations.map( assignedLocation => 
                        <LocationList 
                            key={assignedLocation.id} 
                            id={assignedLocation.id} 
                            name={assignedLocation.name}
                            iconName='location-searching'
                            onPress={this.setCurrentLocation}
                        />)
                    }
                </View>
            </React.Fragment>
        );
    }
}

// get data through props
const mapStateToProps = (state) => {
    return {
        locations: state.userInfo.locations
    }
}

// set data through props
const mapDispatchToProps = dispatch => {
    return {
        setDefaultLocationStudents: (students) => {
            dispatch(setDefaultLocationStudents(students))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetLocationScreen);