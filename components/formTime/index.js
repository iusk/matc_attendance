import React from 'react';
import { View, Text, TimePickerAndroid } from 'react-native';
import styles from './styles';

class FormTime extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            value: this._convertTime(this.props.value)
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            value: this._convertTime(props.value)
        });
    }

    _convertTime = (time) => {
        if (typeof time === 'string') {
            [hour, minute, _] = time.split(":");
            let suffix = '';
            if (hour >= 12) {
                if (hour !== '12') hour -= 12;
                suffix = 'PM';
            } else {
                suffix = 'AM';
            }
            return hour.toString().padStart(2, 0) + ':' + minute.toString().padStart(2, 0) + ' ' + suffix;
        } else {
            return '';
        }
    }

    openTimePicker = async () => {
        const {action, hour, minute} = await TimePickerAndroid.open({
            is24Hour: false,
        });
        if (action === TimePickerAndroid.timeSetAction) {
            const newHour = hour;
            const newMinute = minute;
            const time = newHour + ':' + newMinute;
            this.props.timeSetAction(time);
        }
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.label}>{this.props.name}</Text>
                <Text style={styles.input} onPress={this.openTimePicker}>{this.state.value}</Text>
            </View>
        );
    }
}

export default FormTime;