import React from 'react';
import { View, Text, Picker } from 'react-native';

class FormSelect extends React.Component {
    render() {
        return (
            <Picker
                selectedValue={this.props.value}
                onValueChange={this.props.onChangeValue}
            >
                <Picker.Item label="Mentor" value={0} />
                <Picker.Item label="Admin" value={1} />
            </Picker>
        );
    }
}

export default FormSelect;