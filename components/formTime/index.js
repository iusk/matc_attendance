import React from 'react';
import { View, Text, TimePickerAndroid } from 'react-native';
import { convertTime } from '../../utils/functions';
import styles from './styles';

class FormTime extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            value: convertTime(this.props.value)
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            value: convertTime(props.value)
        });
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