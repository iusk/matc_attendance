import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import LocationList from './locationList';
import UserList from './userList';
import LocationForm from './locationList/locationForm';
import ModalMessage from './modalMessage';
import styles from './styles';

class CustomAdminList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formVisible: false,
            messageModalVisible: false,
            messageModalSuccess: true,
        }
    }

    _isMounted = true; // to prevent memory leaks when you delete a list and still try to call closeForm()

    componentDidMount() {
        this._isMounted = true;
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }

    openForm = () => {
        this.setState( {formVisible: true} );
    }

    closeForm = () => {
        if (this._isMounted) this.setState( {formVisible: false} );
    }

    checkError = (response) => {
        // if (response === 'SUCCESS') {
        //     this._displaySuccessMessage();
        // } else {
        //     this._displayErrorMessage();
        // }
    }

    _displaySuccessMessage = () => {
        this.setState( {
            messageModalVisible: true,
            messageModalSuccess: true
        });
        setTimeout( () => {
            this.setState( {messageModalVisible: false})
        }, 500);
    }

    _displayErrorMessage = () => {
        this.setState( {
            messageModalVisible: true,
            messageModalSuccess: false
        });
        setTimeout( () => {
            this.setState( {messageModalVisible: false})
        }, 500);
    }

    render() {
        if (this.props.type === 'location') {
            return (
                <React.Fragment>
                    <LocationList name={this.props.name} id={this.props.id} />
                    <TouchableOpacity style={styles.addButtonWrapper} onPress={this.openForm}>
                        <Icon type='material-community' name='map-marker-plus' color='#d00000' size={styles.iconSize} />
                    </TouchableOpacity>
                    <LocationForm 
                        visible={this.state.formVisible}
                        name=''
                        checkError={this.checkError}
                        type='Add'
                        closeForm={this.closeForm}
                    />
                    <ModalMessage
                        name='Location'
                        visible={this.state.messageModalVisible} 
                        type='Add'
                        success={this.state.messageModalSuccess}
                    />
                </React.Fragment>
            );
        } else if (this.props.type === 'user') {
            return (
                <React.Fragment>
                    <UserList name={this.props.name} id={this.props.id} />
                    <TouchableOpacity style={styles.addButtonWrapper}>
                        <Icon type='material-community' name='account-plus' />
                    </TouchableOpacity>
                    <LocationForm 
                        visible={this.state.formVisible}
                        name=''
                        checkError={this.checkError}
                        type='Add'
                        closeForm={this.closeForm}
                    />
                    <ModalMessage
                        name='User'
                        visible={this.state.messageModalVisible} 
                        type='Add'
                        success={this.state.messageModalSuccess}
                    />
                </React.Fragment>
            );
        }
    }
}

export default CustomAdminList;