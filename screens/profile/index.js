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
        this.props.navigation.setParams( {title: this.props.userInfo.username} );
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
                {(this.props.userInfo.admin === '1') ?
                <BoxLink 
                    name='Admin Control Panel'
                    iconName='account-key'
                    iconType='material-community'
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
const mapStateToProps = (user) => {
    return {
        userInfo: user
    }
}

export default connect(mapStateToProps)(ProfileScreen);