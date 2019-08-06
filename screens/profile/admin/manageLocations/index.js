import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { LocationList } from '../../../../components';
import styles from './styles';

class ManageLocationsScreen extends React.Component {
    static navigationOptions = {
        title: 'Manage Locations',
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

    render() {
        return (
            <View>
                {this.props.locations.map(location => <LocationList key={location.id} name={location.name} />)}
            </View>
        );
    }
}

// get data through props
const mapStateToProps = (state) => {
    return {
        locations: state.adminInfo.locations,
        users: state.adminInfo.users
    }
}

export default connect(mapStateToProps)(ManageLocationsScreen)
