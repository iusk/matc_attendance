import React from 'react';
import { View } from 'react-native';
import { BoxLink } from '../../../components';
import styles from './styles';

class AdminScreen extends React.Component {
    static navigationOptions = {
        title: 'Admin Control Panel',
        headerStyle: {
            backgroundColor: '#d00000'
        },
        headerTintColor: '#fefdfa',
        headerTitleStyle: {
            color: '#fefdfa'
        }
    };
    constructor(props) {
        super(props);
    }

    _gotoManageLocations = () => {
        this.props.navigation.navigate('ManageLocations');
    }

    _gotoManageUsers = () => {
        this.props.navigation.navigate('ManageUsers');
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <BoxLink name='Manage Locations' iconName='map-marker' iconType='material-community' onPress={this._gotoManageLocations} />
                <BoxLink name='Manage Users' iconName='account-multiple' iconType='material-community' onPress={this._gotoManageUsers} />
            </View>
        );
    }
}

export default AdminScreen;
