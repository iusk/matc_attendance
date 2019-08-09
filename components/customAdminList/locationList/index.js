import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

class LocationList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    _openForm = () => {
        const name = this.props.name;
        this.props.openForm(name, 'Edit', this.props.id);
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
