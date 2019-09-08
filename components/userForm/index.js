import React from 'react';
import { Modal, View, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import FormInput from '../formInput';
import FormSelect from '../formSelect';
import { updateUser, deleteUser, addUser } from '../../data/mysqli';
import { updateUsers } from '../../data/redux';
import { connect } from 'react-redux';
import styles from './styles';

class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            updateName: '',
            updateEmail: '',
            updateAdmin: '',
            visible: this.props.visible
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ 
            visible: props.visible,
            updateName: props.name,
            updateEmail: props.email,
            updateAdmin: props.admin
        });
    }

    _onChangeUserName = (text) => {
        this.setState( {updateName: text} );
    }

    _onChangeEmail = (text) => {
        this.setState( {updateEmail: text} );
    }

    _onChangeAdmin = (value) => {
        this.setState( {updateAdmin: value} );
    }

    _fieldsNotEmpty = () => {
        if (this.state.updateName !== '' && this.state.updateEmail !== '') {
            return true;
        } else {
            Alert.alert(
                'Please make sure none of the fields are empty.',
                response,
                [{ text: 'Okay' }],
                { cancelable: true }
            );
            return false;
        }
    }

    _addUser = () => {
        if (this._fieldsNotEmpty) {
            this.props.closeForm();
            addUser(this.state.updateName, this.state.updateEmail, 
                    this.state.updateAdmin, 1, this.props.checkError, this.updateUserRedux);
        }
    }

    _updateUser = () => {
        if (this._fieldsNotEmpty) {
            this.props.closeForm();
            updateUser(this.props.id, this.state.updateName, this.state.updateEmail, 
                        this.state.updateAdmin, this.props.checkError, this.updateUserRedux);
        }
    }

    _deleteUser = () => {
        this.props.closeForm();
        Alert.alert(
            'Are you sure?',
            'Deleting this user will remove all the locations assigned for this user too.',
            [
                {
                    text: 'Yes', 
                    onPress: () => deleteUser(this.props.id, this.props.checkError, this.updateUserRedux)
                },
                {
                    text: 'No',
                    style: 'cancel'
                }
            ],
            {cancelable: true},
        );
        
    }

    updateUserRedux = (response) => {
        this.props.updateUsers(response);
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
                            <FormInput name='Name' value={this.state.updateName} onChangeText={this._onChangeUserName} />
                            <FormInput name='Email' value={this.state.updateEmail} onChangeText={this._onChangeEmail} />
                            <FormSelect name='User Type' selectedValue={this.state.updateAdmin} onChangeValue={this._onChangeAdmin} 
                                values={['Mentor', 'Admin']} />
                        </View>
                        <View style={styles.buttonWrapper}>
                            {(this.props.type === 'Edit') ?
                            <React.Fragment>
                                <Button buttonStyle={styles.updateButton} title='Update' onPress={this._updateUser} />
                                <Button buttonStyle={styles.deleteButton} title='Delete' onPress={this._deleteUser} />
                            </React.Fragment> :
                            <Button buttonStyle={styles.addButton} title='Add' onPress={this._addUser} />}
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
        users: state.adminInfo.users
    }
}

// set data through props
const mapDispatchToProps = dispatch => {
    return {
        updateUsers: (users) => {
            dispatch(updateUsers(users));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
