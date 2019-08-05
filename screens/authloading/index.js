import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { getUserId } from '../../data/asyncStorage';
import getUserInfo from '../../data/mysqli/getUserInfo';
import { setUser } from '../../data/redux';
import { connect } from 'react-redux';

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._checkSignedIn();
    }

    saveUserInfo = (response) => {
        this.props.setUser({
            username: response.username, 
            admin: response.admin
        });
    }

    _checkSignedIn = async () => {
        const userId = await getUserId();
        if (userId) {
            getUserInfo(userId, this.saveUserInfo);
            this.props.navigation.navigate('Home');
        } else {
            this.props.navigation.navigate('Login');
        }
        
    };

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}

// set data through props
const mapDispatchToProps = dispatch => {
    return {
        setUser: ({username: username, admin: admin}) => {
            dispatch(setUser({username: username, admin: admin}))
        }
    }
}

export default connect(null, mapDispatchToProps)(AuthLoadingScreen);