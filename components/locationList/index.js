import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

class LocationList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.textWrapper}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.text}>{this.props.name}</Text>
                </View>
                <View style={styles.touchableOpacityWrapper}>
                    <TouchableOpacity style={styles.iconWrapper}>
                        <Icon type='material-icons' name='edit-location' size={styles.iconSize} color='#d00000' />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default LocationList;
