import React from 'react';
import { View, Text, Button } from 'react-native'
import { getUserId, signOut } from '../../data/asyncStorage';
import styles from './styles';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
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
            userId: 0 
        };
    }

    componentDidMount() {
        this._getUserId();
    }

    _getUserId = async () => {
        const userId = await getUserId();
        this.setState( {userId: userId} );
    }

    _signOut = () => {
        signOut();
        this.props.navigation.navigate('Auth');
        // going to authloading instead causes the app to stay on home screen until pressed again
        // because it takes a while to clear the id, so authloading sees that the id is still there
        // immediately after signing out
    }

    render() {
        return (
            <View style={styles.contentWrapper}>
            <Text>Mentor Id: {this.state.userId}</Text>
                <Button onPress={this._signOut} title="Sign Out" />
            </View>
        );
    }
}

export default HomeScreen;