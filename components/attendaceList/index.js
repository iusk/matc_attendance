import React from 'react';
import { View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import styles from './styles';

class AttendanceList extends React.Component {
    constructor(props) {
        super(props);

        this.uncheckedIcon = '';
        this.uncheckedColor = '';
        if (this.props.type === 'Take') {
            this.uncheckedIcon = 'circle-o';
            this.uncheckedColor = '#cccccc';
        } else if (this.props.type === 'View') {
            this.uncheckedIcon = 'times-circle-o';
            this.uncheckedColor = '#d00000';
        }
    }

    _onPress = () => {
        if (this.props.type === 'Take') {
            this.props.onPress(this.props.id);
        } else if (this.props.type === 'View') {
            if (this.props.updatable) {
                this.props.onPress(this.props.id, this.props.checked);
            }
        }
        
    }

    render() {
        return (
            <View key={this.props.id} style={styles.row}>
                <View style={styles.firstColumn}>
                    <Text style={styles.studentName} numberOfLines={1} ellipsizeMode='tail'>
                        {this.props.name}
                    </Text>
                </View>
                <View style={styles.secondColumn}>
                    <CheckBox
                        size={styles.checkBoxSize}
                        checked={(this.props.checked===1)}
                        checkedIcon='check-circle-o'
                        uncheckedIcon={this.uncheckedIcon}
                        checkedColor='green'
                        uncheckedColor={this.uncheckedColor}
                        onPress={this._onPress}
                    />
                </View>
            </View>
        );
    }
}

export default AttendanceList;