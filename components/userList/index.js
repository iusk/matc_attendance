import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

class UserList extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.verified) {
            this.firstIconPress = this._openForm;
            this.secondIconPress = this._openLocationsForm;
            this.firstIcon = 'account-edit';
            this.secondIcon = 'map-marker';
        } else {
            this.firstIconPress = this._verifyUser;
            this.secondIconPress = this._deleteUser;
            this.firstIcon = 'account-check';
            this.secondIcon = 'account-remove';
        }
    }
    
    _openForm = () => {
        this.props.firstIconPress(
            this.props.id, 
            this.props.name,
            this.props.email,
            this.props.admin,
            'Edit'
        );
    }

    _openLocationsForm = () => {
        this.props.secondIconPress(
            this.props.id,
            this.props.admin
        );
    }

    _verifyUser = () => {
        this.props.firstIconPress(this.props.id, this.props.name);
    }

    _deleteUser = () => {
        this.props.secondIconPress(this.props.id, this.props.name);
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.touchableOpacityWrapper}>
                    <TouchableOpacity style={styles.iconWrapper} onPress={this.firstIconPress}>
                        <Icon type='material-community' name={this.firstIcon} size={styles.iconSize} color='#fefdfa' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconWrapper} onPress={this.secondIconPress}>
                        <Icon type='material-community' name={this.secondIcon} size={styles.iconSize} color='#fefdfa' />
                    </TouchableOpacity>
                </View>
                <View style={styles.textWrapper}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.text}>{this.props.name}</Text>
                </View>
            </View>
        );
    }
}

export default UserList;
