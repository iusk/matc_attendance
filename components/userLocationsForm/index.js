import React from 'react';
import { Modal, View, Text, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { addUserLocation, deleteUserLocation } from '../../data/mysqli';
import UserLocationsList from '../userLocationsList';
import { updateUserLocations } from '../../data/redux';
import { connect } from 'react-redux';
import memoize from 'memoize-one';
import styles from './styles';

class UserLocationsForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: this.props.visible
        }

        this.assignedLocation = [];
        this.unassignedLocation = [];
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible) {
            this.setState({
                visible: this.props.visible
            });
        }
    }

    _setLocations = memoize((userId, userLocations, locations) => {
        // getting an array of location objects that have been assigned and
        // mapping just the ids of the objects

        const assignedLocationIds = (userLocations.filter(
            obj =>  obj.userId === userId )).map(
            assignedUserLocations => assignedUserLocations.locationId);

        this.assignedLocations = locations.filter(obj => assignedLocationIds.includes(obj.id));
        this.unassignedLocations = locations.filter(obj => !assignedLocationIds.includes(obj.id));
    });

    _addLocation = (locationId) => {
        addUserLocation(this.props.userId, locationId, this.updateLocationRedux);
    }

    _removeLocation = (locationId) => {
        deleteUserLocation(this.props.userId, locationId, this.updateLocationRedux);
    }

    updateLocationRedux = async (userLocations) => {
        this.props.updateUserLocations(userLocations);
    }

    render() {
        this._setLocations(this.props.userId, this.props.userLocations, this.props.locations);
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
                                {this.assignedLocations.map( assignedLocation => 
                                    <UserLocationsList
                                        key={assignedLocation.id}
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
                                {this.unassignedLocations.map( unassignedLocation =>
                                    <UserLocationsList
                                        key={unassignedLocation.id}
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
