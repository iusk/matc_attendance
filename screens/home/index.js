import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import styles from './styles';
import { getDefaultLocationId, getUserId } from '../../data/asyncStorage';
import { takeAttendance, checkAttendance } from '../../data/mysqli/manageAttendance';
import { ModalMessage, AttendanceList } from '../../components';
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
            messageModalSuccess: true,
            messageModalVisible: false,
            attendanceTaken: false,
        };

        this.currentLocationId = 0;
        this.userId = 0;
        this.sortedStudents;
        this._sortStudents();    
    }

    setLocationName = memoize((currentLocationId) => {
        if (currentLocationId) {
            const locationName = this.props.locations.find(
                obj => obj.id === this.currentLocationId
            ).name;
            this.props.navigation.setParams( {locationName: locationName} );
            checkAttendance(this.currentLocationId, this._checkAttendance);
        }
    })

    componentDidMount = async () => {
        this.currentLocationId = await getDefaultLocationId();
        this.userId = await getUserId();

        this.setLocationName(this.currentLocationId);
    }

    componentDidUpdate = async () => {
        this.currentLocationId = await getDefaultLocationId();
        this.setLocationName(this.currentLocationId);
    }

    _checkAttendance = (response) => {
        if (response === 'Taken') {
            this.setState({
                attendanceTaken: true
            })
        } else if (response === 'Not Taken') {
            this._sortStudents();
            this.setState({
                attendanceTaken: false
            })
        }
    }

    _sortStudents = () => {
        const students = [...this.props.students];
        this.sortedStudents = students.sort( (a,b) => {
            const aName = a.firstName + ' ' + a.lastName;
            const bName = b.firstName + ' ' + b.lastName;
            return (aName > bName) ? 1 : -1;
        })
    }

    manageAttendance = (studentId) => {
        const isChecked = this.state.attendance.get(studentId);
        let newAttendance = new Map(this.state.attendance);
        newAttendance.set(studentId, !isChecked);
        this.setState( { attendance: newAttendance });
    }

    _submitForm = () => {
        takeAttendance(this.state.attendance, this.currentLocationId, this.userId, this.checkError);
    }

    checkError = (response) => {
        if (response === 'SUCCESS') {
            this._displaySuccessMessage();
        } else {
            this._displayErrorMessage();
        }
    }

    _displaySuccessMessage  = () => {
        this.setState({
            messageModalSuccess: true,
            messageModalVisible: true,
            attendance: new Map()
        });
        setTimeout( () => {
            this.setState({ 
                messageModalVisible: false,
                attendanceTaken: true,
            })
        }, 500
        )
    }

    _displayErrorMessage  = () => {
        this.setState({
            messageModalSuccess: false,
            messageModalVisible: true
        });
        setTimeout( () => {
            this.setState({ messageModalVisible: false })
        }, 500
        )
    }

    render() {
        if (this.state.attendanceTaken) {
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
                    <ModalMessage
                        name='Attendance'
                        visible={this.state.messageModalVisible} 
                        type='Add'
                        success={this.state.messageModalSuccess}
                    />
                </React.Fragment>
            );
        }
    }
}

// get data through props
const mapStateToProps = (state) => {
    return {
        students: state.userInfo.students,
        locations: state.userInfo.locations
    }
}

export default connect(mapStateToProps)(HomeScreen);