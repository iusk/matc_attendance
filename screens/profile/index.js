import React from 'react';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { signOut } from '../../data/asyncStorage';
import { BoxLink, ModalLoading } from '../../components';
import { getAdminInfo } from '../../data/mysqli/getInfo';
import { setAdminInfo } from '../../data/redux';
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

    constructor(props) {
        super(props);

        this.state = {
            modalLoading: false
        };
    }

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
                        signOut(this.props.navigation);
                    }
                },
                {
                    text: 'No'
                }
            ],
            { cancelable: true }
        );
    }

    _saveAdminInfo = (response) => {
        this.props.setAdminInfo(
            response.locations,
            response.users,
            response.users_locations
        );
    }

    _gotoAdmin = () => {
        this.setState( {modalLoading: true} );
        getAdminInfo(this._saveAdminInfo);
        this.setState( {modalLoading: false} );
        this.props.navigation.navigate('Admin');
    }
    
    render() {
        return (
            <View style={styles.wrapper}>
                <BoxLink name='Change Password' iconName='key-variant' />
                <BoxLink name='View Schedule' iconName='calendar-range' />
                {(this.props.admin === 1) ?
                <BoxLink name='Admin Control Panel' iconName='account-key' onPress={this._gotoAdmin} />
                : null}
                <BoxLink name='Logout' iconName='logout' onPress={this._signOut} />
                <ModalLoading visible={this.state.modalLoading} />
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

// set data through props
const mapDispatchToProps = dispatch => {
    return {
        setAdminInfo: (locations, users) => {
            dispatch(setAdminInfo( {locations: locations, users: users, users_locations: users_locations} ))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);