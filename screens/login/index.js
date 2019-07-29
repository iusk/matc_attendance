import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import InputWithLabel from '../../components/inputWithLabel';
import styles from './styles';

class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return(
            <View style={styles.mainWrapper}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.organization}>Mid-America </Text>
                    <Text style={styles.organization}>Transportation Center</Text>

                    <View style={styles.horizontalRule}></View>

                    <Text style={styles.heading}>Mentor Login</Text>
                </View>
                <View style={styles.formWrapper}>
                    <InputWithLabel icon="user" name="Username" />
                    <InputWithLabel icon="lock" name="Password" />
                    <Button
                        title="Login"
                        titleStyle={styles.buttonText}
                        buttonStyle={styles.button}
                    />
                </View>
            </View>
        );
    }
}

export default LoginScreen;