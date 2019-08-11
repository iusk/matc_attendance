import React from 'react';
import { Modal, View, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import FormInput from '../../../formInput';
import { updateLocation, deleteLocation, addLocation } from '../../../../data/mysqli/manageLocations';
import { updateLocations } from '../../../../data/redux';
import { connect } from 'react-redux';
import styles from './styles';

class LocationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            updateName: this.props.name,
            visible: this.props.visible
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ 
            visible: props.visible,
            updateName: props.name
        });
    }

    _onChangeLocation = (text) => {
        this.setState( {updateName: text} );
    }

    _addLocation = () => {
        this.props.closeForm();
        addLocation(this.state.updateName, this.props.checkError, this.addLocationRedux);
    }

    addLocationRedux = (response, updateName) => {
        if (response === 'SUCCESS') {
            let lastId = (this.props.locations[this.props.locations.length - 1]).id;
            let newLocations = [...this.props.locations, {'id': ++lastId, 'name': updateName}];
            this.props.updateLocations(newLocations);
        }
    }

    _updateLocation = () => {
        this.props.closeForm();
        updateLocation(this.props.id, this.state.updateName, this.props.checkError, this.updateLocationRedux);
    }

    updateLocationRedux = (response, updateName) => {
        if (response === 'SUCCESS') {
            let newLocations = this.props.locations.filter((obj => obj.id !== this.props.id));
            newLocations = [...newLocations, {'id': this.props.id, 'name': updateName}];
            newLocations.sort((a, b) => (a.id - b.id)); // this little function is amazing btw
            this.props.updateLocations(newLocations);
        }
    }

    _deleteLocation = () => {
        this.props.closeForm();
        Alert.alert(
            'Are you sure?',
            'Deleting this location will remove all the schedules for this location too.',
            [
                {
                    text: 'Yes', 
                    onPress: () => deleteLocation(this.props.id, this.props.checkError, this.deleteLocationRedux)
                },
                {
                    text: 'No',
                    style: 'cancel'
                }
            ],
            {cancelable: true},
          );
        
    }

    deleteLocationRedux = (response) => {
        if (response === 'SUCCESS') {
            let newLocations = this.props.locations.filter((obj => obj.id !== this.props.id));
            this.props.updateLocations(newLocations);
        }
    }

    render() {
        return (
            <Modal visible={this.state.visible} transparent={true} animationType='slide'>
                <View style={styles.wrapper}>
                    <View style={styles.innerWrapper}>
                        <View style={styles.cancelWrapper}>
                            <Icon iconStyle={styles.cancelButton} type='material-community' 
                                name='close' color='#d00000' onPress={this.props.closeForm} />
                        </View>
                        <View style={styles.inputWrapper}>
                            <FormInput name='Name' value={this.state.updateName} onChangeText={this._onChangeLocation} />
                        </View>
                        <View style={styles.buttonWrapper}>
                            {(this.props.type === 'Edit') ?
                            <React.Fragment>
                                <Button buttonStyle={styles.updateButton} title='Update' onPress={this._updateLocation} />
                                <Button buttonStyle={styles.deleteButton} title='Delete' onPress={this._deleteLocation} />
                            </React.Fragment> :
                            <Button buttonStyle={styles.addButton} title='Add' onPress={this._addLocation} />}
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
        locations: state.adminInfo.locations
    }
}

// set data through props
const mapDispatchToProps = dispatch => {
    return {
        updateLocations: (locations) => {
            dispatch(updateLocations(locations));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationForm);
