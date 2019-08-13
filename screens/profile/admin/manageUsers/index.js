import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { ModalMessage, UserForm, UserList } from '../../../../components';
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
            name: '',
            email: '',
            admin: 0,
            formType: '',
            messageModalVisible: false,
            messageModalSuccess: true,
            messageModalType: ''
        }
    }

    openForm = (id, name, email, admin, type) => {
        this.setState( {
            formType: type,
            id: id,
            name: name,
            email: email,
            admin: admin,
            formVisible: true,
        } );
    }

    closeForm = () => {
        this.setState( {formVisible: false} );
    }
    
    checkError = (response, type) => {
        if (response === 'SUCCESS') {
            this._displaySuccessMessage(type);
        } else {
            this._displayErrorMessage(type);
        }
    }

    _displaySuccessMessage = (type) => {
        this.setState( {
            users: this.props.users,
            messageModalVisible: true,
            messageModalSuccess: true,
            messageModalType: type
        });
        setTimeout( () => {
            this.setState( {messageModalVisible: false})
        }, 500);
    }

    _displayErrorMessage = (type) => {
        this.setState( {
            users: this.props.users,
            messageModalVisible: true,
            messageModalSuccess: false,
            messageModalType: type
        });
        setTimeout( () => {
            this.setState( {messageModalVisible: false})
        }, 500);
    }

    render() {
        let key = 0;
        return (
            <React.Fragment>
                <ScrollView>
                    {this.state.users.map( user => 
                        <UserList
                            key={key++}
                            id={user.id}
                            name={user.username}
                            email={user.email}
                            admin={user.admin}
                            openForm={this.openForm} 
                        />)
                    }
                </ScrollView>
                <ModalMessage
                    name='User'
                    visible={this.state.messageModalVisible} 
                    type={this.state.messageModalType}
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