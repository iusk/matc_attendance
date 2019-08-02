import React from 'react';
import { View, Text, AsyncStorage, Button } from 'react-native'
import styles from './styles';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };

    state = { 
        userId: 0
    }

    _getUserId = async () => {
        const userId = await AsyncStorage.getItem('userId');
        console.log(userId);
        this.setState( {userId: userId} );
    }

    signOut = async () => {
        await AsyncStorage.clear();
        console.log('cleared');
        this.props.navigation.navigate('Auth');
    }

    render() {
        this._getUserId;
        return (
            <View style={styles.contentWrapper}>
            <Text>Mentor Id: {this.state.userId}</Text>
                <Button onPress={this.signOut} title="Sign Out" />
                <Button title="userid" onPress={this._getUserId} />
            </View>
        );
    }
}

export default HomeScreen;