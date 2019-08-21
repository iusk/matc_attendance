import React from 'react';
import { View, Text, AsyncStorage } from 'react-native'
import styles from './styles';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };

    getUserId = async () => {
        return await AsyncStorage.getItem('userId');
    }
    
    render() {
        return (
            <View style={styles.mainWrapper}>
                <View style={styles.contentWrapper}>
                    <Text>Mentor Id: {this.getUserId}</Text>
                </View>
                <View style={styles.footerWrapper}>
                    <View></View>
                </View>
            </View>
        );
    }
}

export default HomeScreen;