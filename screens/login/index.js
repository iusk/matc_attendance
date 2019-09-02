import React from 'react';
import { View, Text, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { InputWithLabel, ModalLoading } from '../../components';

import { signIn, getDefaultLocationId, setDefaultLocationId } from '../../data/asyncStorage';
import { setUser, setDefaultLocationStudents, setAttendance } from '../../data/redux';
import { getAttendance } from '../../data/mysqli/manageAttendance';
import { getUserId } from '../../data/asyncStorage';
import { getUserInfo } from '../../data/mysqli/getInfo';
import { userLogin } from '../../data/mysqli';

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
            modalLoading: true,
            buttonLoading: false
        };

        this.checkSignedIn(this.saveUserInfo);
    }

    disableLoadingScreen = () => {
        this.setState({ modalLoading: false });
    }

    saveUserInfo = async (response, getStudentsInfo) => {
        console.log('saving user info');
        this.props.setUser(
            response.username, 
            response.admin,
            response.locations
        );
        let defaultLocationId = await getDefaultLocationId();
        if (!defaultLocationId && response.locations.length > 0) {
            defaultLocationId = response.locations[0].id;
            setDefaultLocationId(defaultLocationId);
        } else if (response.locations.length === 0) { // user hasn't been assigned any locations yet
            this.disableLoadingScreen();
            this.props.navigation.navigate('ProfileOnly');
            return;
        }
        await getAttendance(defaultLocationId, this.setAttendanceRedux);
        getStudentsInfo(defaultLocationId, this.saveStudentsInfo);
    }

    setAttendanceRedux = (response) => {
        this.props.setAttendance(response);
    }

    saveStudentsInfo = (response) => {
        this.props.setDefaultLocationStudents(
            response
        );
        this.props.navigation.navigate('Home');
    }

    onChangeEmail = (text) => {
        this.setState( {email: text} );
    }

    onChangePassword = (text) => {
        this.setState( {password: text} );
    }

    _gotoRegisterScreen = () => {
        this.props.navigation.navigate('Register');
    }

    _gotoForgotPasswordScreen = () => {
        this.props.navigation.navigate('ForgotPassword');
    }

    _login = (response) => {
        if (typeof response === 'string') { // string means login failed
            this.setState({
                buttonLoading: false
            });
            Alert.alert(
                'Couldn\'t Login',
                response,
                [{ text: 'Ok' }],
                { cancelable: true }
            );
        } else { // login passed if its an id (int)
            signIn(response, this.checkSignedIn, this.saveUserInfo);
        }
    }
    
    submitForm = () => {
        this.setState( {buttonLoading: true} );
        userLogin(this.state.email, this.state.password, this._login);
    };
    
    checkSignedIn = async (saveUserInfo) => {
        const userId = await getUserId();
        if (!isNaN(userId)) {
            console.log('gettign user info');
            getUserInfo(userId, saveUserInfo);
        } else {
            this.disableLoadingScreen();
        }
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
                    <InputWithLabel 
                        icon="email-outline" 
                        name="Email Address"
                        onChangeText={this.onChangeEmail} 
                        value={this.state.email}
                        secure={false}
                    />
                    <InputWithLabel
                        icon="lock-outline"
                        name="Password"
                        onChangeText={this.onChangePassword}
                        value={this.state.password}
                        secure={true}
                    />
                    <Button
                        title="Login"
                        titleStyle={styles.buttonText}
                        buttonStyle={styles.button}
                        onPress={this.submitForm}
                        loading={this.state.buttonLoading}
                        loadingProps={styles.buttonLoading}
                    />
                    <Text style={styles.footerText}>
                        Not Registered? <Text onPress={this._gotoRegisterScreen} style={styles.link}>Tap here</Text> to sign up.
                    </Text>
                    <Text style={styles.footerText}>
                        <Text onPress={this._gotoForgotPasswordScreen} style={styles.link}>Forgot password?</Text>
                    </Text>
                </View>
                <ModalLoading visible={this.state.modalLoading} msg='Please wait while we gather your info...' />
            </View>
        );
    }
}

// set data through props
const mapDispatchToProps = dispatch => {
    return {
        setUser: (username, admin, locations) => {
            dispatch(setUser( {username: username, admin: admin, locations: locations} ))
        },
        setDefaultLocationStudents: (students) => {
            dispatch(setDefaultLocationStudents(students))
        },
        setAttendance: (attendance) => {
            dispatch(setAttendance(attendance))
        }
    }
}

export default connect(null, mapDispatchToProps)(LoginScreen);