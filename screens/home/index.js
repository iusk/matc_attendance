import React from 'react';
import { View, Text } from 'react-native'
import styles from './styles';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };
    render() {
        return (
            <View style={styles.mainWrapper}>
                <View style={styles.contentWrapper}>
                    <Text>Mentor Id: {this.props.navigation.getParam('mentorId')}</Text>
                </View>
                <View style={styles.footerWrapper}>
                    <View></View>
                </View>
            </View>
        );
    }
}

export default HomeScreen;