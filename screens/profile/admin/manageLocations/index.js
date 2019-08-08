import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { CustomAdminList } from '../../../../components';

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
        let key = 0;
        return (
            <View>
                {this.props.locations.map(location => <CustomAdminList key={key++} id={location.id} name={location.name} type='location' />)}
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
