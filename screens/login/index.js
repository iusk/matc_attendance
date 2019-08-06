import React from 'react';
import { View, Text, Modal, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import InputWithLabel from '../../components/inputWithLabel';
import ModalLoading from '../../components/loading';

import { signIn } from '../../data/asyncStorage';
import { setUser } from '../../data/redux';

import { checkSignedIn, userLoginFunction } from '../../utils/loadingFunctions';

import styles from './styles';

class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errMessage: '',
            buttonLoading: false,
            modalLoading: true
        };

        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangePassword = this._onChangePassword.bind(this);

        checkSignedIn(this._saveUserInfo, this.props.navigation);
    }

    componentWillMount() {
        this.setState( {modalLoading: false} )
    }

    _saveUserInfo = (response) => {
        this.props.setUser(
            response.username, 
            response.admin
        );
    }

    _onChangeEmail = (text) => {
        this.setState( {email: text} );
    }

    _onChangePassword = (text) => {
        this.setState( {password: text} );
    }
    
    _login = (response) => {
        if (response === 'Username/Password not recognized.') {
            this.setState({
                errMessage: response,
                buttonLoading: false
            });
        } else {
            signIn(response, checkSignedIn, this._saveUserInfo, this.props.navigation);
        }
    }
    
    submitForm = () => {
        this.setState( {buttonLoading: true} );
        userLoginFunction(this.state.email, this.state.password, this._login);
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
                        onPress={this.submitForm}
                        loading={this.state.buttonLoading}
                        loadingProps={styles.buttonLoading}
                    />
                </View>
                <ModalLoading visible={this.state.modalLoading} />
            </View>
        );
    }
}

// set data through props
const mapDispatchToProps = dispatch => {
    return {
        setUser: (username, admin) => {
            dispatch(setUser( {username: username, admin: admin} ))
        }
    }
}

export default connect(null, mapDispatchToProps)(LoginScreen);