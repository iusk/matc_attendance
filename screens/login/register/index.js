import React from 'react';
import { Text, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { InputWithLabel } from '../../../components';
import { registerUser } from '../../../data/mysqli';
import styles from './styles';

class RegisterScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
            buttonLoading: false
        }
    }

    onChangeEmail = (email) => {
        this.setState({
            email: email
        });
    }

    onChangeName = (name) => {
        this.setState({
            name: name
        });
    }

    onChangePassword = (password) => {
        this.setState({
            password: password
        });
    }

    onChangeConfirmPassword = (confirmPassword) => {
        this.setState({
            confirmPassword: confirmPassword
        });
    }

    _submitForm = () => {
        this.setState({ buttonLoading: true });
        registerUser(this.state.name, this.state.email, this.state.password, this.state.confirmPassword, this.checkError);
    }

    // errorType => 0 - Email address already registered and verified,
    // 1 - Email address already registered,
    // 2 - new passwords don't match (checked locally), 3 - Email registered successfully,
    // 4 - error from server
    checkError = (errorType) => {
        if (errorType === 0) this._displayAlert('Your Email address has been successfully verified! You may login now.', true);
        else if (errorType === 1) this._displayAlert('Your Email address has already been regitered.', true);
        else if (errorType === 2) this._displayAlert('Please make sure that your passwords match.', false);
        else if (errorType === 3) this._displayAlert('Your Email address couldn\'t be verified, but has been registered. Please wait until we have verified your address.', true);
        else this._displayAlert('Something went wrong and we couldn\'t register you.', false);
    }

    _displayAlert = (msg, navigate) => {
        Alert.alert(
            'Registration Message',
            msg,
            [
                {
                    text: 'Okay',
                    onPress: () => {
                        if (navigate) {
                            this.setState({ email: '', name: '', password: '', confirmPassword: ''});
                            this.props.navigation.navigate('Login')
                        } else {
                            this.setState({ buttonLoading: false });
                        }
                    }
                },
            ],
            { cancelable: false }
        );
    }

    render() {
        return (
            <View style={styles.mainWrapper}>
                <View style={styles.infoWrapper}>
                    <Text style={styles.heading}>Register</Text>
                    <Text style={styles.info}>
                        Please enter the email address that you used to register as a mentor.{'\n'}
                        For security reasons, only email addresses that have been verified are allowed to login.
                    </Text>
                </View>
                <View style={styles.formWrapper}>
                    <InputWithLabel 
                        icon="email-outline" 
                        name="Email Address"
                        onChangeText={this.onChangeEmail} 
                        value={this.state.email}
                        secure={false}
                    />
                    <InputWithLabel 
                        icon="account-outline" 
                        name="Full Name"
                        onChangeText={this.onChangeName} 
                        value={this.state.name}
                        secure={false}
                    />
                    <InputWithLabel 
                        icon="lock-outline" 
                        name="Password"
                        onChangeText={this.onChangePassword} 
                        value={this.state.password}
                        secure={true}
                    />
                    <InputWithLabel 
                        icon="lock-outline" 
                        name="Confirm Password"
                        onChangeText={this.onChangeConfirmPassword} 
                        value={this.state.confirmPassword}
                        secure={true}
                    />
                    <Button
                        title="Register"
                        titleStyle={styles.buttonText}
                        buttonStyle={styles.button}
                        onPress={this._submitForm}
                        loading={this.state.buttonLoading}
                        loadingProps={styles.buttonLoading}
                    />
                </View>
            </View>
        );
    }
}

export default RegisterScreen;