import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

class LocationList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    _onPress = () => {
        if (this.props.iconName === 'edit-location') {
            this.props.onPress(this.props.id, this.props.name, this.props.day, this.props.startTime, this.props.endTime, 'Edit');
        } else {
            this.props.onPress(this.props.id);
        }        
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.touchableOpacityWrapper}>
                    <TouchableOpacity style={styles.iconWrapper} onPress={this._onPress}>
                        <Icon type='material' name={this.props.iconName} size={styles.iconSize} color='#fefdfa' />
                    </TouchableOpacity>
                </View>
                <View style={styles.textWrapper}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.text}>{this.props.name}</Text>
                </View>
            </View>
        );
    }
}

export default LocationList;
