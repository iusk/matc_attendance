import React from 'react';
import { Modal, View, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import FormInput from '../formInput';
import FormSelect from '../formSelect';
import FormTime from '../formTime';
import { updateLocation, deleteLocation, addLocation } from '../../data/mysqli/manageLocations';
import { updateLocations } from '../../data/redux';
import { connect } from 'react-redux';
import styles from './styles';

class LocationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            updateName: this.props.name,
            updateDay: this.props.day,
            updateStartTime: this.props.startTime,
            updateEndTime: this.props.endTime,
            visible: this.props.visible
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ 
            visible: props.visible,
            updateName: props.name,
            updateDay: props.day,
            updateStartTime: props.startTime,
            updateEndTime: props.endTime
        });
    }

    _onChangeLocation = (text) => {
        this.setState( {updateName: text} );
    }

    _onChangeDay = (value) => {
        this.setState( {updateDay: value} );
    }

    _onSelectStartTime = (value) => {
        this.setState( {updateStartTime: value} );
    }

    _onSelectEndTime = (value) => {
        this.setState( {updateEndTime: value} );
    }

    _addLocation = () => {
        this.props.closeForm();
        addLocation(this.state.updateName, this.state.updateDay, this.state.updateStartTime, 
            this.state.updateEndTime, this.props.checkError, this.updateLocationRedux);
    }

    _updateLocation = () => {
        this.props.closeForm();
        updateLocation(this.props.id, this.state.updateName, this.state.updateDay, 
            this.state.updateStartTime, this.state.updateEndTime, this.props.checkError, this.updateLocationRedux);
    }

    _deleteLocation = () => {
        this.props.closeForm();
        Alert.alert(
            'Are you sure?',
            'Deleting this location will remove all the schedules for this location too.',
            [
                {
                    text: 'Yes', 
                    onPress: () => deleteLocation(this.props.id, this.props.checkError, this.updateLocationRedux)
                },
                {
                    text: 'No',
                    style: 'cancel'
                }
            ],
            {cancelable: true},
          );
        
    }

    updateLocationRedux = (response) => {
        this.props.updateLocations(response);
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
                            <FormSelect name="Day" selectedValue={this.state.updateDay} onChangeValue={this._onChangeDay} 
                                values={['Choose One', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']} />
                            <FormTime name="Start Time" value={this.state.updateStartTime} timeSetAction={this._onSelectStartTime} />
                            <FormTime name="End Time" value={this.state.updateEndTime} timeSetAction={this._onSelectEndTime} />
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
