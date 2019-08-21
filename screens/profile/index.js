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
            title: navigation.getParam('Title', 'Profile'),
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
        this.props.navigation.setParams({ Title: 'Profile: ' + this.props.username });
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

    _setAdminInfoRedux = (response) => {
        this.props.setAdminInfo(
            response.locations,
            response.users,
            response.userLocations
        );
        this.setState( {modalLoading: false} );
    }

    _gotoAdmin = () => {
        this.setState( {modalLoading: true} );
        getAdminInfo(this._setAdminInfoRedux);
        this.props.navigation.navigate('Admin');
    }

    _gotoSetLocation = () => {
        this.props.navigation.navigate('SetCurrentLocation');
    }

    _gotoViewSchedule = () => {
        this.props.navigation.navigate('ViewSchedule');
    }
    
    render() {
        return (
            <View style={styles.wrapper}>
                <BoxLink name='Change Password' iconName='key-variant' iconType='material-community' />
                <BoxLink name='View Schedule' iconName='calendar-range' iconType='material-community' onPress={this._gotoViewSchedule} />
                <BoxLink name='Manage Students' iconName='users' iconType='font-awesome' 
                        onPress={() => this.props.navigation.navigate('ManageStudents')} />
                {((this.props.locations !== undefined) && (this.props.locations.length > 0)) ?
                <BoxLink name='Set Current Location' iconName='my-location' iconType='material' onPress={this._gotoSetLocation} />
                : null}
                {(this.props.admin === 1) ?
                <BoxLink name='Admin Control Panel' iconName='account-key' iconType='material-community' onPress={this._gotoAdmin} />
                : null}
                <BoxLink name='Logout' iconName='logout' iconType='material-community' onPress={this._signOut} />
                <ModalLoading visible={this.state.modalLoading} />
            </View>
        );
    }
}

// get data through props
const mapStateToProps = (state) => {
    return {
        username: state.userInfo.username,
        admin: state.userInfo.admin,
        locations: state.userInfo.locations
    }
}

// set data through props
const mapDispatchToProps = dispatch => {
    return {
        setAdminInfo: (locations, users, userLocations) => {
            dispatch(setAdminInfo( {locations: locations, users: users, userLocations: userLocations} ))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);