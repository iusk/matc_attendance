import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import InputWithLabel from '../../components/inputWithLabel';
import styles from './styles';
import URL from '../../data/mysqli/loginCheck';
import { signIn } from '../../data/asyncStorage';

class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = { 
            email: '',
            password: '',
            errMessage: ''
        };

        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangePassword = this._onChangePassword.bind(this);
    }

    _onChangeEmail = (text) => {
        this.setState( {email: text} );
    }

    _onChangePassword = (text) => {
        this.setState( {password: text} );
    }

    _signIn = (responseJson) => {
        signIn(responseJson);
        this.props.navigation.navigate('Home');
    }

    userLoginFunction = () => {
        const givenEmail = this.state.email;
        const givenPassword = this.state.password;

        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: givenEmail,
                password: givenPassword
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            if (responseJson === 'Username/Password not recognized.') {
                this.setState( {errMessage: responseJson} );
            } else {
                this._signIn(responseJson);
            }
        }).catch((error) => {
            console.warn(error);
        })
    };

    render() {
        // TODO: Add "Register" Button - After Admin Control Panel
        // TODO: Add "Forgot Password" Button
        return(
            <View style={styles.mainWrapper}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.organization}>Mid-America </Text>
                    <Text style={styles.organization}>Transportation Center</Text>

                    <View style={styles.horizontalRule}></View>

                    <Text style={styles.heading}>Attendance App</Text>

                    <View style={styles.gap}></View>
                    <Text style={styles.heading}>Login</Text>
                </View>
                <View style={styles.formWrapper}>
                    <Text>{this.state.errMessage}</Text>
                    <InputWithLabel 
                        icon="user" 
                        name="Email Address" 
                        onChangeText={this._onChangeEmail} 
                        value={this.state.email} 
                    />
                    <InputWithLabel 
                        icon="lock" 
                        name="Password" 
                        onChangeText={this._onChangePassword} 
                        value={this.state.password} 
                    />
                    <Button
                        title="Login"
                        titleStyle={styles.buttonText}
                        buttonStyle={styles.button}
                        onPress={this.userLoginFunction}
                    />
                </View>
            </View>
        );
    }
}

export default LoginScreen;