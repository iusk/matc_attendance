import React from 'react';
import { View, Text, Button } from 'react-native'
import { getUserId, signOut } from '../../data/asyncStorage';
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
        const userId = await getUserId();
        this.setState( {userId: userId} );
    }

    _signOut = () => {
        signOut();
        this.props.navigation.navigate('Auth');
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