import React from 'react';
import { ActivityIndicator, StatusBar, View, Text, Alert } from 'react-native';
import { getUserId } from '../../data/asyncStorage';
import { getUserInfo, getAdminInfo } from '../../data/mysqli/getInfo';
import { setUser } from '../../data/redux';
import { connect } from 'react-redux';
import styles from './styles';

class LoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        switch (this.props.navigation.getParam('loadingType')) {
            case 'getAdminInfo':
                this._verifyAdmin();
            default:
                this._checkSignedIn();
        }
    }

    _verifyAdmin = () => {
        if (this.props.admin === '1') {
            getAdminInfo(this._saveAdminInfo);
            this.props.navigation.navigate('Admin');
        } else {
            Alert.alert(
                'Access Denied',
                'You are not allowed to view this page.',
                [
                    {
                        text: 'Ok',
                    }
                ],
                { cancelable: true }
            );
        }
    }

    _saveAdminInfo = (response) => {
        this.props.setAdminInfo(
            response.locations,
            response.users
        );
    }

    _checkSignedIn = async () => {
        const userId = await getUserId();
        if (userId) {
            getUserInfo(userId, this._saveUserInfo);
            this.props.navigation.navigate('Home');
        } else {
            this.props.navigation.navigate('Login');
        }
    };

    _saveUserInfo = (response) => {
        this.props.setUser(
            response.username, 
            response.admin
        );
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <ActivityIndicator size='large' />
                <StatusBar hidden={true} />
                <Text>Please wait while we gather your info...</Text>
            </View>
        )
    }
}

// get data through props
const mapStateToProps = (state) => {
    return {
        username: state.userInfo.username,
        admin: state.userInfo.admin
    }
}

// set data through props
const mapDispatchToProps = dispatch => {
    return {
        setUser: (username, admin) => {
            dispatch(setUser( {username: username, admin: admin} ))
        },
        setAdminInfo: (locations, users) => {
            dispatch(setAdminInfo( {locations: locations, users: users} ))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);