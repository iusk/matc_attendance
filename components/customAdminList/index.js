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

    _openForm = () => {
        this.props.openForm('', 'Add', null);
    }

    render() {
        if (this.props.type === 'location') {
            return (
                <React.Fragment>
                    <LocationList name={this.props.name} id={this.props.id} checkError={this.props.checkError} openForm={this.props.openForm} />
                    <TouchableOpacity style={styles.addButtonWrapper} onPress={this._openForm}>
                        <Icon type='material-community' name='map-marker-plus' color='#d00000' size={styles.iconSize} />
                    </TouchableOpacity>
                </React.Fragment>
            );
        } else if (this.props.type === 'user') {
            return (
                <React.Fragment>
                    <UserList name={this.props.name} id={this.props.id} checkError={this.props.checkError} />
                    <TouchableOpacity style={styles.addButtonWrapper}>
                        <Icon type='material-community' name='account-plus' />
                    </TouchableOpacity>
                </React.Fragment>
            );
        }
    }
}

export default CustomAdminList;