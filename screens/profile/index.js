import React from 'react';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { signOut } from '../../data/asyncStorage';
import BoxLink from '../../components/boxLink';
import styles from './styles';

class ProfileScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'Profile'),
            headerStyle: {
                backgroundColor: '#d00000'
            },
            headerTintColor: '#fefdfa',
            headerTitleStyle: {
                color: '#fefdfa'
            }
        };
    };

    componentWillMount() {
        this.props.navigation.setParams( {title: this.props.username} );
    }

    _signOut = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to Logout?',
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        signOut();
                        this.props.navigation.navigate('Auth');
                    }
                },
                {
                    text: 'No'
                }
            ],
            { cancelable: true }
        );
    }

    _gotoAdmin = () => {
        this.props.navigation.navigate(
            'Loading',
            {
                loadingType: 'getAdminInfo'
            }
        )
    }
    
    render() {
        return (
            <View style={styles.wrapper}>
                <BoxLink 
                    name='Change Password'
                    iconName='key-variant'
                    iconType='material-community'
                />
                <BoxLink 
                    name='View Schedule'
                    iconName='calendar-range'
                    iconType='material-community'
                />
                {(this.props.admin === '1') ?
                <BoxLink 
                    name='Admin Control Panel'
                    iconName='account-key'
                    iconType='material-community'
                    onPress={this._gotoAdmin}
                />: null}
                <BoxLink 
                    name='Logout'
                    iconName='logout'
                    iconType='material-community'
                    onPress={this._signOut}
                />
            </View>
        );
    }
}

// get data through props
const mapStateToProps = (state) => {
    return {
        username: state.userInfo.username,
        admin: state.userInfo.admin
    }
}

export default connect(mapStateToProps)(ProfileScreen);