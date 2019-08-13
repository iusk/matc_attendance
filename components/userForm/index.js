import React from 'react';
import { Modal, View, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import FormInput from '../formInput';
import FormSelect from '../formSelect';
import { updateUser, deleteUser, addUser } from '../../data/mysqli/manageUsers';
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

    _addUser = () => {
        this.props.closeForm();
        addUser(this.state.updateName, this.state.updateEmail, this.state.updateAdmin, 1, this.props.checkError, this.addUserRedux);
    }

    addUserRedux = (response, updateName, updateEmail, admin, verified) => {
        if (response === 'SUCCESS') {
            let lastId = (this.props.users[this.props.users.length - 1]).id;
            let newUsers = [...this.props.users, {
                'id': ++lastId, 'username': updateName, 'email': updateEmail, 'admin': admin, 'verified': verified
            }];
            this.props.updateUsers(newUsers);
        }
    }

    _updateUser = () => {
        this.props.closeForm();
        updateUser(this.props.id, this.state.updateName, this.state.updateEmail, this.state.updateAdmin, this.props.checkError, this.updateUserRedux);
    }

    updateUserRedux = (response, updateName, updateEmail, admin) => {
        if (response === 'SUCCESS') {
            let newUsers = this.props.users.filter((obj => obj.id !== this.props.id));
            newUsers = [...newUsers, {
                'id': this.props.id, 'username': updateName, 'email': updateEmail, 'admin': admin, 'verified': 1
        }];
            newUsers.sort((a, b) => (a.id - b.id)); // this little function is amazing btw
            this.props.updateUsers(newUsers);
        }
    }

    _deleteUser = () => {
        this.props.closeForm();
        Alert.alert(
            'Are you sure?',
            'Deleting this user will remove all the schedules for this user too.',
            [
                {
                    text: 'Yes', 
                    onPress: () => deleteUser(this.props.id, this.props.checkError, this.deleteUserRedux)
                },
                {
                    text: 'No',
                    style: 'cancel'
                }
            ],
            {cancelable: true},
        );
        
    }

    deleteUserRedux = (response) => {
        if (response === 'SUCCESS') {
            let newUsers = this.props.users.filter((obj => obj.id !== this.props.id));
            this.props.updateUsers(newUsers);
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
