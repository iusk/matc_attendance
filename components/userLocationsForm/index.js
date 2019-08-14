import React from 'react';
import { Modal, View, Text } from 'react-native';
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

        const assignedLocationIds = (props.userLocations.filter(
                                            obj => obj.user_id === props.userId)).map(
                                            assignedUserLocations => assignedUserLocations.location_id);

        const unassignedLocationIds = (props.userLocations.filter(
                                                obj => obj.user_id !== props.userId)).map(
                                                unassignedLocations => unassignedLocations.location_id);

        console.log(unassignedLocationIds);

        const assignedLocations = this.props.locations.filter(obj => assignedLocationIds.includes(obj.id));
        const unassignedLocations = this.props.locations.filter(obj => unassignedLocationIds.includes(obj.id));

        this.setState({ 
            visible: props.visible,
            userId: props.userId,
            assignedLocations: assignedLocations,
            unassignedLocations: unassignedLocations
        });
    }

    _addLocation = (locationId) => {
        addLocation(this.state.userId, locationId, this.addLocationRedux);
    }

    addLocationRedux = (response, userId, locationId) => {
        if (response === 'SUCCESS') {
            let lastId = (this.props.userLocations[this.props.userLocations.length - 1]).id;
            let newUserLocations = [...this.props.userLocations, {
                'id': ++lastId, 'user_id': userId, 'location_id': locationId
            }];
            this.props.updateUserLocations(newUserLocations);
        }
    }

    _removeLocation = (locationId) => {
        removeLocation(this.state.userId, locationId, this.removeLocationRedux);
    }

    removeLocationRedux = (response, locationId) => {
        if (response === 'SUCCESS') {
            let newUserLocations = this.props.userLocations.filter(obj => 
                obj.location_id !== locationId || obj.user_id !== this.state.userId
            );
            this.props.updateUserLocations(newUserLocations);
        }
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
                            <Text>Assigned Locations:</Text>
                            {this.state.assignedLocations.map( assignedLocation => 
                                <UserLocationsList
                                    key={assignedKey++}
                                    name={assignedLocation.name}
                                    iconName='map-marker-off'
                                    manageLocation={this._removeLocation}
                                />
                            )}
                        </View>
                        <View style={styles.locationWrapper}>
                            <Text>Unassigned Locations:</Text>
                            {this.state.unassignedLocations.map( unassignedLocation =>
                                <UserLocationsList
                                    key={unassignedKey++}
                                    name={unassignedLocation.name}
                                    iconName='map-marker-plus'
                                    manageLocation={this._addLocation}
                                />
                            )}
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
        userLocations: state.adminInfo.user_locations
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
