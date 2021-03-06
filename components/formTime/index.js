import React from 'react';
import { View, Text } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { convertTime } from '../../utils/functions';
import styles from './styles';

class FormTime extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            value: '',
            timePickerVisible: false
        }
    }

    openTimePicker = async () => {
        this.setState({
            timePickerVisible: true
        })
    }

    handelTimePicked = (time) => {
        const timeString = time.getHours() + ':' + time.getMinutes();
        this.props.timeSetAction(timeString);
        this.setState({
            timePickerVisible: false
        })
    }

    hideTimePicker = () => {
        this.setState({
            timePickerVisible: false
        })
    }

    render() {
        const time = convertTime(this.props.value);
        return (
            <View style={styles.wrapper}>
                <Text style={styles.label}>{this.props.name}</Text>
                <Text style={styles.input} onPress={this.openTimePicker}>{time}</Text>
                <DateTimePicker mode='time'
                    is24Hour={false}
                    isVisible={this.state.timePickerVisible}
                    onConfirm={this.handelTimePicked}
                    onCancel={this.hideTimePicker}
                />
            </View>
        );
    }
}

export default FormTime;