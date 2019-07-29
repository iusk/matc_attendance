import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './styles';
import { Icon } from 'react-native-elements';

class InputWithLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }
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
                    value={this.state.text}
                    onChangeText={(text)=>this.setState({text})}
                    secureTextEntry={secure}
                />
            </View>
            
        );
    }
}

export default InputWithLabel;