import React from 'react';
import { Modal, View, Text, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { addLocation, removeLocation } from '../../data/mysqli/manageUserLocations';
import UserLocationsList from '../userLocationsList';
import { updateUserLocations } from '../../data/redux';
import { connect } from 'react-redux';
import styles from './styles';

class UserLocationsForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.userId,
            visible: this.props.visible,
            assignedLocations: [],
            unassignedLocations: []
        }        
    }

    componentWillReceiveProps(props) {
        // getting an array of location objects that have been assigned and
        // mapping just the ids of the objects

        const assignedLocationIds = (props.userLocations.filter(
            obj =>  obj.userId === props.userId )).map(
            assignedUserLocations => assignedUserLocations.locationId);

        const assignedLocations = props.locations.filter(obj => assignedLocationIds.includes(obj.id));
        const unassignedLocations = props.locations.filter(obj => !assignedLocationIds.includes(obj.id));

        this.setState({ 
            visible: props.visible,
            userId: props.userId,
            assignedLocations: assignedLocations,
            unassignedLocations: unassignedLocations
        });
    }

    _addLocation = (locationId) => {
        addLocation(this.state.userId, locationId, this.updateLocationRedux);
    }

    _removeLocation = (locationId) => {
        removeLocation(this.state.userId, locationId, this.updateLocationRedux);
    }

    updateLocationRedux = (response) => {
        this.props.updateUserLocations(response);
    }

    render() {
        let assignedKey = 0;
        let unassignedKey = 0;
        return (
            <Modal visible={this.state.visible} transparent={true} animationType='slide'>
                <View style={styles.wrapper}>
                    <View style={styles.innerWrapper}>
                        <View style={styles.cancelWrapper}>
                            <Icon iconStyle={styles.cancelButton} type='material-community' 
                                name='close' color='#d00000' onPress={this.props.closeForm} />
                        </View>
                        <View style={styles.locationWrapper}>
                            <Text style={styles.label}>Assigned Locations:</Text>
                            <ScrollView>
                                {this.state.assignedLocations.map( assignedLocation => 
                                    <UserLocationsList
                                        key={assignedKey++}
                                        id={assignedLocation.id}
                                        name={assignedLocation.name}
                                        iconName='map-marker-off'
                                        manageLocation={this._removeLocation}
                                    />
                                )}
                            </ScrollView>
                        </View>
                        <View style={styles.locationWrapper}>
                            <Text style={styles.label}>Unassigned Locations:</Text>
                            <ScrollView>
                                {this.state.unassignedLocations.map( unassignedLocation =>
                                    <UserLocationsList
                                        key={unassignedKey++}
                                        id={unassignedLocation.id}
                                        name={unassignedLocation.name}
                                        iconName='map-marker-plus'
                                        manageLocation={this._addLocation}
                                    />
                                )}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

// get data through props
const mapStateToProps = (state) => {
    return {
        locations: state.adminInfo.locations,
        userLocations: state.adminInfo.userLocations
    }
}

// set data through props
const mapDispatchToProps = dispatch => {
    return {
        updateUserLocations: (userLocations) => {
            dispatch(updateUserLocations(userLocations));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLocationsForm);
