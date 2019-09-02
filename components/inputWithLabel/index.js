import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './styles';
import { Icon } from 'react-native-elements';

class InputWithLabel extends React.Component {
    // TODO: Learn about prop type validation
    // static propTypes = {
    //     name: React.propTypes.string.isRequired,
    //     icon: React.propTypes.string.isRequired,
    // }

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
                <Icon
                    name={this.props.icon}
                    type='material-community'
                    color='#fefdfa'
                />
                <TextInput
                    style={styles.input}
                    placeholder={this.props.name}
                    value={this.props.value}
                    onChangeText={this.props.onChangeText}
                    secureTextEntry={this.state.secureTextEntry}
                />
                {(this.props.secure) ?
                    <Icon
                        name={this.state.secureIcon}
                        type='material-community'
                        color='#fefdfa'
                        onPress={this._changeSecureState}
                        underlayColor='#d00000'
                    /> : null
                }
            </View>
        );
    }
}

export default InputWithLabel;