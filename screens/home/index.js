import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import styles from './styles';
import { getDefaultLocationId, getUserId } from '../../data/asyncStorage';
import { takeAttendance } from '../../data/mysqli/manageAttendance';
import { updateAttendanceInfo } from '../../data/redux';
import { AttendanceList, ModalLoading } from '../../components';
import { convertDate } from '../../utils/functions';
import memoize from 'memoize-one';

class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('locationName', 'Take Attendance'),
            headerStyle: {
                backgroundColor: '#d00000'
            },
            headerTintColor: '#fefdfa',
            headerTitleStyle: {
                color: '#fefdfa'
            }
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            userId: 0,
            attendance: new Map(), // map of studentId => attendance(boolean)
            modalLoading: false,
        };

        this.currentLocationId = 0;
        this.userId = 0;
        this.sortedStudents;
        this.today = new Date();
    }

    componentDidMount = async () => {
        this.currentLocationId = await getDefaultLocationId();
        this.userId = await getUserId();

        this.setLocationName(this.currentLocationId);
    }

    componentDidUpdate = async () => {
        this.currentLocationId = await getDefaultLocationId();
        this.setLocationName(this.currentLocationId);
    }

    setLocationName = memoize((currentLocationId) => {
        console.log('setting location name');
        if (currentLocationId) {
            const locationName = this.props.locations.find(
                obj => obj.id === this.currentLocationId
            ).name;
            this.props.navigation.setParams( {locationName: locationName} );
        }
    })

    checkAttendance = memoize((attendance) => {
        if (attendance !== undefined) {
            console.log('checking attendance');
            return attendance.hasOwnProperty(convertDate(this.today));
        }
    });    

    _sortStudents = memoize((students) => {
        const tempStudents = [...students];
        this.sortedStudents = tempStudents.sort( (a,b) => {
            const aName = a.firstName + ' ' + a.lastName;
            const bName = b.firstName + ' ' + b.lastName;
            return (aName > bName) ? 1 : -1;
        })
    });

    manageAttendance = (studentId) => {
        const isChecked = this.state.attendance.get(studentId);
        let newAttendance = new Map(this.state.attendance);
        newAttendance.set(studentId, !isChecked);
        this.setState( { attendance: newAttendance });
    }

    _submitForm = () => {
        this.setState({ modalLoading: true });
        takeAttendance(this.state.attendance, this.currentLocationId, this.userId, this.updateAttendanceRedux);
    }

    updateAttendanceRedux = (response) => {
        this.props.updateAttendanceInfo(response, convertDate(this.today));
        this.setState({
            modalLoading: false
        })
    }

    render() {
        const attendanceTaken = this.checkAttendance(this.props.attendance);
        if (attendanceTaken) {
            return (
                <View style={styles.attendanceTakenWrapper}>
                    <Text style={styles.attendanceTakenMsg}>
                        Today's attendace for this location has been taken!
                    </Text>
                    <View style={styles.gap}></View>
                    <Text style={styles.attendanceTakenNote}>
                        You can edit today's attendance from "Attendance Report" screen if you wish to.
                    </Text>
                </View>
            );
        } else {
            this._sortStudents(this.props.students);
            return (
                <React.Fragment>
                    <ScrollView>
                        <View style={styles.row}>
                            <View style={styles.firstColumn}>
                                <Text style={styles.heading}>Student Name</Text>
                            </View>
                            <View style={styles.secondColumn}>
                                <Text style={styles.heading}>Present</Text>
                            </View>
                        </View>
                        {this.sortedStudents.map( student => 
                            <AttendanceList
                                key={student.id}
                                id={student.id}
                                name={student.firstName + ' ' + student.lastName}
                                type='Take'
                                checked={this.state.attendance.get(student.id)}
                                onPress={this.manageAttendance}
                            />
                        )}
                        <View style={styles.buttonWrapper}>
                            <Button buttonStyle={styles.submitButton} title='Submit Attendance' onPress={this._submitForm} />
                        </View>
                    </ScrollView>
                    <ModalLoading msg="Submitting Attendance..." visible={this.state.modalLoading} />
                </React.Fragment>
            );
        }
    }
}

// get data through props
const mapStateToProps = (state) => {
    return {
        students: state.userInfo.students,
        locations: state.userInfo.locations,
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);