import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { convertTime } from '../../../utils/functions';
import styles from './styles';

class ViewScheduleScreen extends React.Component {
    static navigationOptions = {
        title: 'View Schedule',
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
    }

    _convertDay = (day) => {
        const arrayOfDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        return arrayOfDays[day-1];
    }

    render() {
        return (
            <ScrollView>
                {this.props.locations.map( location => {
                    return (
                        <View style={styles.wrapper} key={location.id}>
                            <View style={styles.locationWrapper}>
                                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.location}>{location.name}</Text>
                            </View>
                            <View style={styles.scheduleWrapper}>
                                <Text style={styles.schedule}>Day: {this._convertDay(location.day)}</Text>
                                <Text style={styles.schedule}>Time: {convertTime(location.startTime)} - {convertTime(location.endTime)}</Text>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        );
    }
}

// get data through props
const mapStateToProps = (state) => {
    return {
        locations: state.userInfo.locations
    }
}

export default connect(mapStateToProps)(ViewScheduleScreen);