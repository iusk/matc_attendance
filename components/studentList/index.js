import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

class StudentList extends React.Component {
    constructor(props) {
        super(props);
    }

    _onPress = () => {
        this.props.onPress(this.props.id, this.props.locationId, this.props.firstName, this.props.lastName, 'Edit');
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.touchableOpacityWrapper}>
                    <TouchableOpacity style={styles.iconWrapper} onPress={this._onPress}>
                        <Icon type='material-community' name='account-edit' size={styles.iconSize} color='#fefdfa' />
                    </TouchableOpacity>
                </View>
                <View style={styles.textWrapper}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.text}>{this.props.firstName} {this.props.lastName}</Text>
                </View>
            </View>
        );
    }
}

export default StudentList;
