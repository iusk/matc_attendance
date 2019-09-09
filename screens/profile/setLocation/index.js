import React from 'react';
import { View, Text } from 'react-native';
import { getDefaultLocationId, setDefaultLocationId } from '../../../data/asyncStorage';
import { getStudentsInfo } from '../../../data/mysqli/getInfo';
import { getAttendance } from '../../../data/mysqli/manageAttendance';
import { setDefaultLocationStudents, setAttendance } from '../../../data/redux';
import { connect } from 'react-redux';
import { LocationList, ModalLoading } from '../../../components';
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
            assignedLocations: [],
            modalLoading: false
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
        this.setState({
            modalLoading: true
        })
        setDefaultLocationId(id, this.checkAssignedLocation);
        getStudentsInfo(id, (response) => this.props.setDefaultLocationStudents(response));
        getAttendance(id, this.setAttendanceRedux);
    }

    setAttendanceRedux = (response) => {
        this.props.setAttendance(response);
        this.setState({
            modalLoading: false
        })
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
                        onPress={() => {return}}
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
                <ModalLoading visible={this.state.modalLoading} msg='Changing your location...' />
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
        },
        setAttendance: (attendance) => {
            dispatch(setAttendance(attendance))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetLocationScreen);