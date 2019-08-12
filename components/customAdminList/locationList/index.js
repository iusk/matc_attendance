import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

class LocationList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    _openForm = () => {
        this.props.openForm(this.props.id, this.props.name, this.props.day, this.props.startTime, this.props.endTime, 'Edit');
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.textWrapper}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.text}>{this.props.name}</Text>
                </View>
                <View style={styles.touchableOpacityWrapper}>
                    <TouchableOpacity style={styles.iconWrapper} onPress={this._openForm}>
                        <Icon type='material-icons' name='edit-location' size={styles.iconSize} color='#d00000' />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default LocationList;
