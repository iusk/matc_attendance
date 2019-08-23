import React from 'react';
import { View, Text, Button, DatePickerAndroid } from 'react-native';
import { connect } from 'react-redux';
import { updateAttendanceInfo } from '../../data/redux';
import { updateAttendance } from '../../data/mysqli/manageAttendance';
import { AttendanceList, ModalLoading } from '../../components';
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
            modalVisible: false
        }

        this.sortedAttendence;
        this.today = new Date();
    }

    selectDate = async () => {
        this.setState({
            dateSelected: false
        });
        const {action, year, month, day} = await DatePickerAndroid.open({
            date: this.today,
            maxDate: this.today,
            mode: 'calendar'
        });
        if (action === DatePickerAndroid.dateSetAction) {
            this.setState({
                date: this._convertDate(year, month, day),
                dateSelected: true
            })
        }
    }

    _convertDate = memoize((year, month, day) => {
        return year + '-' + (month+1).toString().padStart(2, 0) + '-' + day.toString().padStart(2, 0);
    })

    manageAttendance = (studentId, present) => {
        // this.setState({
        //     modalVisible: true
        // })
        present = (present) ? 0 : 1; // make present if absent and vice versa
        updateAttendance(studentId, present, this.updateAttendanceRedux);
    }

    updateAttendanceRedux = (response) => {
        let newAttendance = [...this.props.attendance];
        newAttendance = newAttendance; // TODO: work on this
        this.props.updateAttendanceInfo(response, this.today);
        // this.setState({
        //     modalVisible: false
        // })
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
            const today = this._convertDate(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
            this.sortAttendance(this.props.attendance[date]);
            return (
                <React.Fragment>
                    {this.sortedAttendence.map( student => 
                        <AttendanceList
                            key={student.id}
                            id={student.id}
                            name={student.name}
                            type='View'
                            updatable={today === date}
                            checked={student.present}
                            onPress={this.manageAttendance}
                        />
                    )}
                    <ModalLoading visible={this.state.modalVisible} msg='Updating Attendance - Please Wait' />
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

// set data through props
const mapDispatchToProps = dispatch => {
    return {
        updateAttendanceInfo: (attendance, date) => {
            dispatch(updateAttendanceInfo( {attendance: attendance, date: date} ))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);