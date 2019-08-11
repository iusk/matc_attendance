import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import LocationList from './locationList';
import UserList from './userList';
import styles from './styles';

class CustomAdminList extends React.Component {
    constructor(props) {
        super(props);
    }

    _openLocationForm = () => {
        this.props.openForm(null, '', 'Add');
    }

    _openUserForm = () => {
        this.props.openForm(null, '', '', 0, 'Add');
    }

    render() {
        if (this.props.type === 'Location') {
            return (
                <React.Fragment>
                    <LocationList name={this.props.name} id={this.props.id} checkError={this.props.checkError} openForm={this.props.openForm} />
                    <TouchableOpacity style={styles.addButtonWrapper} onPress={this._openLocationForm}>
                        <Icon type='material-community' name='map-marker-plus' color='#d00000' size={styles.iconSize} />
                    </TouchableOpacity>
                </React.Fragment>
            );
        } else if (this.props.type === 'User') {
            return (
                <React.Fragment>
                    <UserList id={this.props.id} name={this.props.name} email={this.props.email} admin={this.props.admin} openForm={this.props.openForm} />
                    <TouchableOpacity style={styles.addButtonWrapper} onPress={this._openUserForm}>
                        <Icon type='material-community' name='account-plus' color='#d00000' size={styles.iconSize} />
                    </TouchableOpacity>
                </React.Fragment>
            );
        }
    }
}

export default CustomAdminList;