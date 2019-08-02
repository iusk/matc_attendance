import React from 'react';
import { View, Text, AsyncStorage, Button } from 'react-native'
import styles from './styles';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home'
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
        const userId = await AsyncStorage.getItem('userId')
        this.setState( {userId: userId} );
    }

    signOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    render() {
        return (
            <View style={styles.contentWrapper}>
            <Text>Mentor Id: {this.state.userId}</Text>
                <Button onPress={this.signOut} title="Sign Out" />
            </View>
        );
    }
}

export default HomeScreen;