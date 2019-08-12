import React from 'react';
import { View, Text, Picker } from 'react-native';
import styles from './styles';

class FormSelect extends React.Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.label}>{this.props.name}</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={this.props.value}
                    onValueChange={this.props.onChangeValue}
                >
                    <Picker.Item label="Mentor" value={0} />
                    <Picker.Item label="Admin" value={1} />
                </Picker>
            </View>
            
        );
    }
}

export default FormSelect;