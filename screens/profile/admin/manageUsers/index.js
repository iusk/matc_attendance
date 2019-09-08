import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, ScrollView, Text, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { ModalMessage, UserForm, UserList, UserLocationsForm } from '../../../../components';
import { verifyUser, deleteUser } from '../../../../data/mysqli';
import { updateUsers } from '../../../../data/redux';
import memoize from 'memoize-one';
import styles from './styles';

class ManageUsersScreen extends React.Component {
    static navigationOptions = {
        title: 'Manage Users',
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
            users: this.props.users,
            formVisible: false,
            locationsFormVisible: false,
            locationsAdminVisible: false,
            name: '',
            email: '',
            admin: 0,
            registered: true,
            formType: '',
            messageModalVisible: false,
            messageModalSuccess: true,
            messageModal: ''
        }
    }

    openForm = (id, name, email, admin, registered, type) => {
        console.log('opening form');
        console.log(registered);
        this.setState({
            formType: type,
            id: id,
            name: name,
            email: email,
            admin: admin,
            registered: registered,
            formVisible: true,
        });
    }

    closeForm = () => {
        this.setState( {formVisible: false} );
    }

    openLocationsForm = (id, admin) => {
        if (admin) {
            this.setState({
                messageModalVisible: true,
                messageModalSuccess: false,
                messageModal: 'Admins are assigned all the locations by default',
            })
            setTimeout(() => {
                this.setState( { messageModalVisible: false} )
            }, 1000);
        } else {
            this.setState({
                id: id,
                locationsFormVisible: true
            });
        }
    }

    closeLocationsForm = () => {
        this.setState( { locationsFormVisible: false} );
    }

    verifyUser = (id, name) => {
        Alert.alert(
            'Verify User',
            'Are you sure you want to verify \'' + name + '\'?',
            [
                {
                    text: 'Yes', 
                    onPress: () => verifyUser(id, this.checkError, this.updateUserRedux)
                },
                {
                    text: 'No',
                    style: 'cancel'
                }
            ],
            {cancelable: true},
        );
    }

    deleteUser = (id, name) => {
        Alert.alert(
            'Delete User?',
            'Are you sure you don\'t recognize \'' + name + '\'?',
            [
                {
                    text: 'Yes', 
                    onPress: () => deleteUser(id, this.checkError, this.updateUserRedux)
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

    checkError = (type, error) => {
        if (!error) {
            this._displaySuccessMessage(type);
        } else {
            this._displayErrorMessage(type);
        }
    }

    _displaySuccessMessage = (type) => {
        let msg = '';
        switch(type) {
            case 'Add':
                msg = 'User added successfully!';
                break;
            case 'Update':
                msg = 'User updated successfully!';
                break;
            case 'Delete':
                msg = 'User removed successfully!';
                break;
            case 'Verify':
                msg = 'User verified successfully!';
                break;
        }
        this.setState( {
            users: this.props.users,
            messageModal: msg,
            messageModalVisible: true,
            messageModalSuccess: true
        });
        setTimeout( () => {
            this.setState( {messageModalVisible: false})
        }, 500);
    }

    _displayErrorMessage = (type) => {
        let msg = '';
        switch(type) {
            case 'Add':
                msg = 'User couldn\'t be added.';
                break;
            case 'Update':
                msg = 'User couldn\'t be updated.';
                break;
            case 'Delete':
                msg = 'User couldn\'t be deleted.';
                break;
            case 'Verify':
                msg = 'User couldn\'t be verified.';
                break;
        }
        this.setState( {
            users: this.props.users,
            messageModal: msg,
            messageModalVisible: true,
            messageModalSuccess: false
        });
        setTimeout( () => {
            this.setState( {messageModalVisible: false})
        }, 500);
    }

    _getVerifiedUsers = memoize((users) => {
        console.log('getting verifiedUsers');
        let verifiedUsers = [...users];
        return verifiedUsers.filter(
            obj => obj.verified === 1
        );
    });

    _getUnverifiedUsers = memoize((users) => {
        let unverifiedUsers = [...users];
        return unverifiedUsers.filter(
            obj => obj.verified === 0
        );
    });

    render() {
        const verifiedUsers = this._getVerifiedUsers(this.state.users);
        const unverifiedUsers = this._getUnverifiedUsers(this.state.users);
        console.log(verifiedUsers);
        return (
            <React.Fragment>
                <ScrollView>
                    {(unverifiedUsers.length > 0) ?
                        <React.Fragment>
                            <Text style={styles.info}>These users require verification:</Text>
                            {unverifiedUsers.map( user => 
                                <UserList
                                    key={user.id}
                                    id={user.id}
                                    name={user.username}
                                    verified={false}
                                    firstIconPress={this.verifyUser}
                                    secondIconPress={this.deleteUser}
                                />)
                            }
                        </React.Fragment> :
                        null
                    }
                    {(unverifiedUsers.length > 0) ? <Text style={styles.info}>Other verified users:</Text> : null}
                    {verifiedUsers.map( user => 
                        <UserList
                            key={user.id}
                            id={user.id}
                            name={user.username}
                            email={user.email}
                            admin={user.admin}
                            verified={true}
                            registered={user.registered}
                            firstIconPress={this.openForm}
                            secondIconPress={this.openLocationsForm}
                        />)
                    }
                </ScrollView>
                <ModalMessage
                    msg={this.state.messageModal}
                    visible={this.state.messageModalVisible}
                    success={this.state.messageModalSuccess}
                />
                <UserForm 
                    visible={this.state.formVisible}
                    id={this.state.id}
                    name={this.state.name}
                    email={this.state.email}
                    admin={this.state.admin}
                    registered={this.state.registered}
                    checkError={this.checkError}
                    type={this.state.formType}
                    closeForm={this.closeForm}
                />
                <UserLocationsForm
                    visible={this.state.locationsFormVisible}
                    userId={this.state.id}
                    closeForm={this.closeLocationsForm}
                />
                <TouchableOpacity style={styles.addButtonWrapper} onPress={() => this.openForm(null, '', '', 0, 0, 'Add')}>
                    <Icon type='material-community' name='account-plus' color='#fefdfa' size={styles.iconSize} />
                </TouchableOpacity>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsersScreen);