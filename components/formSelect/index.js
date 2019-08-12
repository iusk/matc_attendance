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
                    selectedValue={this.props.selectedValue}
                    onValueChange={this.props.onChangeValue}
                >
                    {this.props.values.map((valueLabel, index) =>
                        <Picker.Item key={index} label={valueLabel} value={index} />
                    )}
                </Picker>
            </View>
            
        );
    }
}

export default FormSelect;