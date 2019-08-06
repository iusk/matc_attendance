import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

class BoxLink extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.contentWrapper} onPress={this.props.onPress}>
                <Icon name={this.props.iconName} type='material-community'
                size={styles.iconSize} color='#d00000' iconStyle={styles.icon} />
                <Text style={styles.text}>{this.props.name}</Text>
            </TouchableOpacity>
        );
    }
}

export default BoxLink;