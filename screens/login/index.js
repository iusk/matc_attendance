import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { InputWithLabel, ModalLoading } from '../../components';

import { signIn, getDefaultLocationId, setDefaultLocationId } from '../../data/asyncStorage';
import { setUser, setDefaultLocationStudents, setAttendance } from '../../data/redux';
import { getAttendance } from '../../data/mysqli/manageAttendance';
import { getUserId } from '../../data/asyncStorage';
import { getUserInfo } from '../../data/mysqli/getInfo';
import URL from '../../data/mysqli/loginCheck';

import styles from './styles';

class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            modalLoading: true,
            email: '',
            password: '',
            errMessage: '',
            buttonLoading: false
        };

        this.checkSignedIn(this.saveUserInfo, this.saveStudentsInfo, this.disableLoadingScreen);
    }

    disableLoadingScreen = () => {
        this.setState({ modalLoading: false });
    }

    saveUserInfo = async (response, getStudentsInfo) => {
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
            this.props.navigation.navigate('Profile-Only');
            return;
        }
        getAttendance(defaultLocationId, this.setAttendanceRedux);
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
    
    _login = (response) => {
        if (response === 'Username/Password not recognized.') {
            this.setState({
                errMessage: response,
                buttonLoading: false
            });
        } else {
            signIn(response, this.checkSignedIn, this.saveUserInfo, this.disableLoadingScreen);
        }
    }
    
    submitForm = () => {
        this.setState( {buttonLoading: true} );
        this.userLoginFunction(this.state.email, this.state.password, this._login);
    };

    userLoginFunction = (givenEmail, givenPassword, login) => {
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
            login(responseJson);
        }).catch((error) => {
            console.warn(error);
        })
    };
    
    checkSignedIn = async (saveUserInfo, disableLoadingScreen) => {
        const userId = await getUserId();
        if (userId) {
            getUserInfo(userId, saveUserInfo);
        } else {
            disableLoadingScreen();
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
                    <Text>{this.state.errMessage}</Text>
                    <InputWithLabel 
                        icon="user" 
                        name="Email Address" 
                        onChangeText={this.onChangeEmail} 
                        value={this.state.email} 
                    />
                    <InputWithLabel 
                        icon="lock" 
                        name="Password" 
                        onChangeText={this.onChangePassword} 
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