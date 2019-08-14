import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

class UserLocationsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.touchableOpacityWrapper}>
                    <TouchableOpacity style={styles.iconWrapper}>
                        <Icon type='material-community' name={this.props.iconName} size={styles.iconSize} color='#fefdfa' />
                    </TouchableOpacity>
                </View>
                <View style={styles.textWrapper}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.text}>{this.props.name}</Text>
                </View>
            </View>
        );
    }
}

export default UserLocationsList;
