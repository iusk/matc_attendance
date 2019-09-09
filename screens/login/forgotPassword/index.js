import React from 'react';
import { Text, Alert, View } from 'react-native';
import { Button } from 'react-native-elements';
import { InputWithLabel } from '../../../components';
import { forgotPassword } from '../../../data/mysqli';
import styles from './styles';

class ForgotPasswordScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            name: '',
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

    _submitForm = () => {
        this.setState({ buttonLoading: true });
        forgotPassword(this.state.name, this.state.email, this.checkError);
    }

    // errorType => 0 - Username and Email matched and New password will be sent,
    // 1 - Not matched, 2 - error from server
    checkError = (errorType) => {
        if (errorType === 0) this._displayAlert('Please check your Email for your new password.', true);
        else if (errorType === 1) this._displayAlert('We couldn\'t find a user with the given name and email address.', false);
        else this._displayAlert('Something went wrong internally.', false);
    }

    _displayAlert = (msg, navigate) => {
        Alert.alert(
            'Forgot Password',
            msg,
            [
                {
                    text: 'Okay',
                    onPress: () => {
                        if (navigate) {
                            this.setState({ email: '', name: '' });
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
                    <Text style={styles.heading}>Forgot Password</Text>
                    <Text style={styles.info}>
                        Please enter the requested information below.
                    </Text>
                </View>
                <View style={styles.formWrapper}>
                    <InputWithLabel 
                        icon="account-outline" 
                        name="Full Name"
                        onChangeText={this.onChangeName} 
                        value={this.state.name}
                        secure={false}
                    />
                    <InputWithLabel
                        icon="email-outline" 
                        name="Email Address"
                        onChangeText={this.onChangeEmail} 
                        value={this.state.email}
                        secure={false}
                    />
                    <Button
                        title="Submit"
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

export default ForgotPasswordScreen;