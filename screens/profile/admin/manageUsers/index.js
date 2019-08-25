import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import { ModalMessage, UserForm, UserList, UserLocationsForm } from '../../../../components';
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
            formType: '',
            messageModalVisible: false,
            messageModalSuccess: true,
            messageModal: ''
        }
    }

    openForm = (id, name, email, admin, type) => {
        this.setState({
            formType: type,
            id: id,
            name: name,
            email: email,
            admin: admin,
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

    render() {
        return (
            <React.Fragment>
                <ScrollView>
                    {this.state.users.map( user => 
                        <UserList
                            key={user.id}
                            id={user.id}
                            name={user.username}
                            email={user.email}
                            admin={user.admin}
                            openForm={this.openForm} 
                            openLocationsForm={this.openLocationsForm}
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
                    checkError={this.checkError}
                    type={this.state.formType}
                    closeForm={this.closeForm}
                />
                <UserLocationsForm
                    visible={this.state.locationsFormVisible}
                    userId={this.state.id}
                    closeForm={this.closeLocationsForm}
                />
                <TouchableOpacity style={styles.addButtonWrapper} onPress={() => this.openForm(null, '', '', 0, 'Add')}>
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

export default connect(mapStateToProps)(ManageUsersScreen);