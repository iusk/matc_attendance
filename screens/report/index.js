import React from 'react';
import { View, Text, Button, DatePickerAndroid } from 'react-native';
import { connect } from 'react-redux';
import { AttendanceList } from '../../components';
import memoize from 'memoize-one';

class ReportScreen extends React.Component {
    static navigationOptions = {
        title: 'Attendance Report',
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
            dateSelected: false,
            date: '',
        }

        this.sortedAttendence;
    }

    selectDate = async () => {
        this.setState({
            dateSelected: false
        });
        const today = new Date();
        const {action, year, month, day} = await DatePickerAndroid.open({
            date: today,
            maxDate: today,
            mode: 'calendar'
        });
        if (action === DatePickerAndroid.dateSetAction) {
            this.setState({
                date: year + '-' + (month+1).toString().padStart(2, 0) + '-' + day.toString().padStart(2, 0),
                dateSelected: true
            })
        }
    }

    manageAttendance = (studentId, locationId) => {

    }

    sortAttendance = memoize((attendance) => {
        console.log('memoize');
        this.sortedAttendence = attendance.sort( (a,b) => {
            return (a.name > b.name) ? 1 : -1;
        })
    })

    render() {
        if (this.state.dateSelected) {
            console.log('render');
            const date = this.state.date;
            this.sortAttendance(this.props.attendance[date]);
            return (
                <React.Fragment>
                    {this.sortedAttendence.map( student => 
                        <AttendanceList
                            key={student.id}
                            id={student.id}
                            name={student.name}
                            type='View'
                            checked={student.present}
                            onPress={this.manageAttendance}
                        />
                    )}
                </React.Fragment>
            );
        } else {
            return (
                <View>
                    <Button title='Select Date' onPress={this.selectDate} />
                </View>
            );
        }
    }
}

// get data through props
const mapStateToProps = (state) => {
    return {
        attendance: state.attendanceInfo
    }
}

export default connect(mapStateToProps)(ReportScreen);