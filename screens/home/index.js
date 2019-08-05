import React from 'react';
import { View, Text } from 'react-native'
import { getUserId } from '../../data/asyncStorage';
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

    render() {
        return (
            <View style={styles.contentWrapper}>
                <Text>Mentor Id: {this.state.userId}</Text>
            </View>
        );
    }
}

export default HomeScreen;