import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import styles from './styles';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Take Attendance',
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
            userId: 0,
            attendance: new Map() // map of studentId => attendance(boolean)
        };

        // TODO: sort students alphabetically
    }

    _manageAttendance = (studentId) => {
        const isChecked = this.state.attendance.get(studentId); // if undefined, automatically becomes false when assigning
        let newAttendance = new Map(this.state.attendance);
        newAttendance.set(studentId, !isChecked);
        this.setState( { attendance: newAttendance });
    }

    _submitForm = () => {
        console.log(this.state.attendance);
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.row}>
                    <View style={styles.firstColumn}>
                        <Text style={styles.heading}>Student Name</Text>
                    </View>
                    <View style={styles.secondColumn}>
                        <Text style={styles.heading}>Present</Text>
                    </View>
                </View>
                {this.props.students.map( student => {
                    return (
                        <View key={student.id} style={styles.row}>
                            <View style={styles.firstColumn}>
                                <Text style={styles.studentName} numberOfLines={1} ellipsizeMode='tail'>
                                    {student.firstName} {student.lastName}
                                </Text>
                            </View>
                            <View style={styles.secondColumn}>
                                <CheckBox
                                    size={styles.checkBoxSize}
                                    checked={this.state.attendance.get(student.id)}
                                    checkedIcon='check-circle-o'
                                    uncheckedIcon='circle-o'
                                    checkedColor='green'
                                    onPress={() => this._manageAttendance(student.id)}
                                />
                            </View>
                        </View>
                    );
                })}
                <View style={styles.buttonWrapper}>
                    <Button buttonStyle={styles.submitButton} title='Submit Attendance' onPress={this._submitForm} />
                </View>
            </ScrollView>
            
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