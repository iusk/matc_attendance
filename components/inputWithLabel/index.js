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

    render() {
        const secure = (this.props.name === 'Password');
        return (
            <View style={styles.wrapper}>
                <Icon
                    name={this.props.icon}
                    type='antdesign'
                    color='#fefdfa'
                />
                <TextInput
                    style={styles.input}
                    placeholder={this.props.name}
                    value={this.props.value}
                    onChangeText={this.props.onChangeText}
                    secureTextEntry={secure}
                />
            </View>
        );
    }
}

export default InputWithLabel;