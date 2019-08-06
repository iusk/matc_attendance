import React from 'react';
import { ActivityIndicator, StatusBar, View, Text } from 'react-native';
import { getUserId } from '../../data/asyncStorage';
import getUserInfo from '../../data/mysqli/getUserInfo';
import { setUser } from '../../data/redux';
import { connect } from 'react-redux';
import styles from './styles';

class LoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        switch (this.props.navigation.getParam('loadingType')) {
            case 'getAdminInfo':
                // TODO: Implement Admin Screen
                return 0;
            default:
                this._checkSignedIn();
        }
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
        this.props.setUser({
            username: response.username, 
            admin: response.admin
        });
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

// set data through props
const mapDispatchToProps = dispatch => {
    return {
        setUser: ({username: username, admin: admin}) => {
            dispatch(setUser({username: username, admin: admin}))
        }
    }
}

export default connect(null, mapDispatchToProps)(LoadingScreen);