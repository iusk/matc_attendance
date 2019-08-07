import React from 'react';
import { Modal, View, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import FormInput from '../../formInput';
import { updateLocation, deleteLocation } from '../../../../data/mysqli/manageLocations';
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
        this.setState( {visible: props.visible} );
    }

    _onChangeLocation = (text) => {
        this.setState( {updateName: text} );
    }

    _updateLocation = () => {
        this.props.closeForm();
        updateLocation(this.props.id, this.state.updateName, this.props.checkError, this.updateLocationRedux)
    }

    updateLocationRedux = (response) => {
        if (response === 'SUCCESS') {
            let locations = this.props.locations;
            index = locations.findIndex((obj => obj.id === this.props.id));
            console.log(locations);
            console.log(index);
            locations[index].name = this.props.updateName;
            console.log(locations);
            console.log(index);
            this.props.updateLocations(locations);
            console.log('done');
            console.log(this.props.locations);
        }
    }

    _deleteLocation = () => {
        this.setState( {locationModalVisible: false} );
        Alert.alert(
            'Are you sure?',
            'Deleting this location will also remove any schedule of users for this location.',
            [
                {
                    text: 'Yes', 
                    onPress: () => deleteLocation(this.props.id, this.props.checkError)
                },
                {
                    text: 'No',
                    style: 'cancel'
                }
            ],
            {cancelable: true},
          );
        
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
                            <Button buttonStyle={styles.updateButton} title='Update' onPress={this._updateLocation} />
                            <Button buttonStyle={styles.deleteButton} title='Delete' onPress={this._deleteLocation} />
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
            dispatch(updateLocations(locations))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationForm);
