import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

class FormInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            secureTextEntry: this.props.secure,
            secureIcon: 'eye-outline'
        }
    }

    _changeSecureState = () => {
        if (this.state.secureTextEntry) {
            this.setState({
                secureTextEntry: false,
                secureIcon: 'eye-off-outline'
            });
        } else {
            this.setState({
                secureTextEntry: true,
                secureIcon: 'eye-outline'
            });
        }
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.label}>{this.props.name}:</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        value={this.props.value}
                        onChangeText={this.props.onChangeText}
                        secureTextEntry={this.state.secureTextEntry}
                    />
                    {(this.props.secure) ?
                    <Icon
                        name={this.state.secureIcon}
                        type='material-community'
                        color='#8c8c8c'
                        onPress={this._changeSecureState}
                        containerStyle={styles.icon}
                        size={styles.iconSize}
                    /> : null
                    }
                </View>
            </View>
        );
    }
}

export default FormInput;