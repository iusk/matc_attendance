import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
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

        this.state = { 
            name: '' 
        };
    }

    componentWillMount = () => {
        console.log(this.props.userInfo);
        this.setState( {name: this.props.userInfo.username} )
    }
    
    render() {
        return (
            <View>
                <Text>{this.state.name}</Text>
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