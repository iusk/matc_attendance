import React from 'react';
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux';
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
        // console.log('home');
        // console.log(this.props.students);
        this._getUserId();
    }

    temp = () => {
        console.log(this.props.students);
    }

    _getUserId = async () => {
        const userId = await getUserId();
        this.setState( {userId: userId} );
    }

    render() {
        return (
            <View style={styles.contentWrapper}>
                <Text>Mentor Id: {this.state.userId}</Text>
                <Button title='Test' onPress={this.temp} />
            </View>
        );
    }
}

// get data through props
const mapStateToProps = (state) => {
    return {
        students: state.userInfo.students
    }
}

export default connect(mapStateToProps)(HomeScreen);