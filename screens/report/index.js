import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { updateAttendanceInfo } from '../../data/redux';
import { updateAttendance } from '../../data/mysqli/manageAttendance';
import { AttendanceList, ModalLoading } from '../../components';
import { convertDate } from '../../utils/functions';
import memoize from 'memoize-one';
import styles from './styles';

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
            modalVisible: false,
            datePickerVisible: false
        }

        this.sortedAttendence;
        this.today = new Date();
    }

    selectDate = () => {
        this.setState({
            datePickerVisible: true
        });
    }

    handelDatePicked = (date) => {
        this.setState({
            date: convertDate(date),
            datePickerVisible: false,
            dateSelected: true
        })
    }

    hideDatePicker = () => {
        this.setState({
            datePickerVisible: false
        })
    }

    updateAttendance = (studentId, present) => {
        this.setState({
            modalVisible: true
        })
        present = (present) ? 0 : 1; // make present if absent and vice versa
        updateAttendance(studentId, present, this.updateAttendanceRedux);
    }

    updateAttendanceRedux = (response) => {
        this.props.updateAttendanceInfo(response, convertDate(this.today));
        this.setState({
            modalVisible: false
        })
    }

    sortAttendance = memoize((attendance) => {
        this.sortedAttendence = attendance.sort( (a,b) => {
            return (a.name > b.name) ? 1 : -1;
        })
    })

    render() {
        const date = this.state.date;
        if (this.state.dateSelected && this.props.attendance[date] !== undefined) {
            const today = convertDate(this.today);
            this.sortAttendance([...this.props.attendance[date]]);
            return (
                <View style={styles.wrapper}>
                    <View style={styles.scroll}>
                        <ScrollView>
                            {this.sortedAttendence.map( student => 
                                <AttendanceList
                                    key={student.id}
                                    id={student.id}
                                    name={student.name}
                                    type='View'
                                    updatable={today === date}
                                    checked={(student.present===1)}
                                    onPress={this.updateAttendance}
                                />
                            )}
                        </ScrollView>
                    </View>
                    <View style={styles.selectDateSelected}>
                        <Text>Selected Date: {this.state.date}</Text>
                        <Button buttonStyle={styles.button} title='Select Another Date' onPress={this.selectDate} />
                        <DateTimePicker mode='date'
                            isVisible={this.state.datePickerVisible}
                            onConfirm={this.handelDatePicked}
                            onCancel={this.hideDatePicker}
                            maximumDate={new Date()}
                        />
                    </View>
                    <ModalLoading visible={this.state.modalVisible} msg='Updating Attendance - Please Wait' />
                </View>
            );
        } else if (this.state.dateSelected) {
            return (
                <View style={styles.selectDateNotSelected}>
                    <Text>No attendance found for: {this.state.date}</Text>
                    <Button buttonStyle={styles.button} title='Select Another Date' onPress={this.selectDate} />
                    <DateTimePicker mode='date'
                        isVisible={this.state.datePickerVisible}
                        onConfirm={this.handelDatePicked}
                        onCancel={this.hideDatePicker}
                        maximumDate={new Date()}
                    />
                </View>
            );
        } else {
            return (
                <View style={styles.selectDateNotSelected}>
                    <Text>Please select a date:</Text>
                    <Button buttonStyle={styles.button} title='Select Date' onPress={this.selectDate} />
                    <DateTimePicker mode='date'
                        isVisible={this.state.datePickerVisible}
                        onConfirm={this.handelDatePicked}
                        onCancel={this.hideDatePicker}
                        maximumDate={new Date()}
                    />
                </View>
            )
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
            dispatch(updateAttendanceInfo({ attendance: attendance, date: date} ));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);