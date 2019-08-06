import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class AdminScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={ {backgroundColor: 'blue'} }>
                <Text>
                    {this.props.locations}
                </Text>
                <Text>
                    {this.props.users}
                </Text>
            </View>
        );
    }
}

// get data through props
const mapStateToProps = (state) => {
    return {
        locations: state.adminInfo.locations,
        users: state.userInfo.users
    }
}

export default connect(mapStateToProps)(AdminScreen);
