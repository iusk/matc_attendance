import React from 'react';
import { View, Text, Button } from 'react-native';
import getUserInfo from '../../data/mysqli/getUserInfo';
import { getUserId } from '../../data/asyncStorage/index';
// import { getUserInfo } from '../../data/redux';
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

    componentDidMount() {
        this._getUserInfo();
    }

    _getUserInfo = async () => {
        const id = await getUserId();
        getUserInfo(id, (userInfo) => {
            this.setState( {name: userInfo['username']} );
            this.render();
        }); 
    }
    
    render() {
        return (
            <View>
                <Text>{this.props.userInfo}</Text>
                <Button title="fn" onPress={getUserInfo(1)} />
            </View>
        );
    }
}


const mapStateToProps = (state) => ({
    userInfo: state.userInfo
});

export default connect(mapStateToProps)(ProfileScreen);