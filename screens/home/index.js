import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import styles from './styles';
import { getDefaultLocationId, getUserId } from '../../data/asyncStorage';
import { takeAttendance } from '../../data/mysqli/manageAttendance';

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
            attendance: new Map() // map of studentId => attendance(boolean)
        };

        this.currentLocationId = 0;
        this.userId = 0;        
        // TODO: sort students alphabetically
    }

    componentWillMount = async () => {
        this.currentLocationId = await getDefaultLocationId();
        this.userId = await getUserId();

        if (this.currentLocationId) {
            const locationName = this.props.locations.find(
                obj => obj.id === this.currentLocationId
            ).name;
            this.props.navigation.setParams( {locationName: locationName} );
        }
    }

    _manageAttendance = (studentId) => {
        const isChecked = this.state.attendance.get(studentId); // if undefined, automatically becomes false when assigning
        let newAttendance = new Map(this.state.attendance);
        newAttendance.set(studentId, !isChecked);
        this.setState( { attendance: newAttendance });
    }

    _submitForm = () => {
        takeAttendance(this.state.attendance, this.currentLocationId, this.userId);
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
        students: state.userInfo.students,
        locations: state.userInfo.locations
    }
}

export default connect(mapStateToProps)(HomeScreen);