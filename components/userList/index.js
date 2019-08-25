import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

class UserList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    _openForm = () => {
        this.props.openForm(
            this.props.id, 
            this.props.name,
            this.props.email,
            this.props.admin,
            'Edit');
    }

    _openLocationsForm = () => {
        this.props.openLocationsForm(
            this.props.id,
            this.props.admin
        )
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.touchableOpacityWrapper}>
                    <TouchableOpacity style={styles.iconWrapper} onPress={this._openLocationsForm}>
                        <Icon type='material-community' name='map-marker' size={styles.iconSize} color='#fefdfa' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconWrapper} onPress={this._openForm}>
                        <Icon type='material-community' name='account-edit' size={styles.iconSize} color='#fefdfa' />
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
