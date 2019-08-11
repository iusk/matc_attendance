import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

class FormInput extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.label}>{this.props.name}:</Text>
                <TextInput
                    style={styles.input}
                    value={this.props.value}
                    onChangeText={this.props.onChangeText}
                />
            </View>
        );
    }
}

export default FormInput;