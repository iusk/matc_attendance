import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import FormInput from '../../../components/formInput';
import { ModalMessage } from '../../../components';
import { changePassword } from '../../../data/mysqli';
import { getUserId } from '../../../data/asyncStorage';
import styles from './styles';

class ChangePasswordScreen extends React.Component {
    static navigationOptions = {
        title: 'Change Password',
        headerStyle: {
            backgroundColor: '#d00000'
        },
        headerTintColor: '#fefdfa',
        headerTitleStyle: {
            color: '#fefdfa'
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            messageModal: '',
            messageModalVisible: false,
            messageModalSuccess: true,
        }
    }

    onChangeCurrentPassword = (currentPassword) => {
        this.setState({
            currentPassword: currentPassword
        })
    }

    onChangeNewPassword = (newPassword) => {
        this.setState({
            newPassword: newPassword
        })
    }

    onChangeConfirmPassword = (confirmPassword) => {
        this.setState({
            confirmPassword: confirmPassword
        })
    }

    // errorType => 0 - no error, 1 - Email address already registerd,
    // 2 - new passwords don't match (checked locally), 3 - error from server
    checkError = (errorType) => {
        if (errorType === 0) this._displaySuccessMessage();
        else if (errorType === 1) this._displayErrorMessage('Current password not correct!');
        else if (errorType === 2) this._displayErrorMessage('New passwords don\'t match!');
        else this._displayErrorMessage('Password couldn\'t be updated');
    }

    _displaySuccessMessage = () => {
        this.setState( {
            messageModal: 'Password successfully changed!',
            messageModalVisible: true,
            messageModalSuccess: true,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
        setTimeout( () => {
            this.setState( {messageModalVisible: false})
        }, 1000);
    }

    _displayErrorMessage = (msg) => {
        this.setState( {
            messageModal: msg,
            messageModalVisible: true,
            messageModalSuccess: false,
        });
        setTimeout( () => {
            this.setState( {messageModalVisible: false})
        }, 1000);
    }

    submit = async () => {
        changePassword(await getUserId(), this.state.currentPassword, this.state.newPassword, this.state.confirmPassword, this.checkError);
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <FormInput
                    name="Current Password" 
                    value={this.state.currentPassword}
                    onChangeText={this.onChangeCurrentPassword} 
                    secure={true} 
                />
                <FormInput
                    name="New Password"
                    value={this.state.newPassword}
                    onChangeText={this.onChangeNewPassword}
                    secure={true}
                />
                <FormInput
                    name="Confirm Password"
                    value={this.state.confirmPassword}
                    onChangeText={this.onChangeConfirmPassword}
                    secure={true}
                />
                <View style={styles.buttonWrapper}>
                    <Button
                        title="Submit"
                        onPress={this.submit}
                        containerStyle={styles.button}
                    />
                </View>
                <Text style={styles.info}>Please use symbols and numbers to make your password more secure!</Text>
                <ModalMessage visible={this.state.messageModalVisible}
                    msg={this.state.messageModal}
                    success={this.state.messageModalSuccess}
                />
            </View>
        );
    }
}

export default ChangePasswordScreen;
