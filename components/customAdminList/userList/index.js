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

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.textWrapper}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.text}>{this.props.name}</Text>
                </View>
                <View style={styles.touchableOpacityWrapper}>
                    <TouchableOpacity style={styles.iconWrapper} onPress={this._openForm}>
                        <Icon type='material-community' name='account-edit' size={styles.iconSize} color='#d00000' />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default UserList;
