import React from 'react';
import { Modal, View, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import FormInput from '../formInput';
import { addStudent, updateStudent, deleteStudent } from '../../data/mysqli/manageStudents';
import { setDefaultLocationStudents } from '../../data/redux';
import { connect } from 'react-redux';
import styles from './styles';

class StudentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            updateFirstName: this.props.firstName,
            updateLastName: this.props.lastName,
            visible: this.props.visible
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ 
            visible: props.visible,
            updateFirstName: props.firstName,
            updateLastName: props.lastName
        });
    }

    _onChangeFirstName = (text) => {
        this.setState( {updateFirstName: text} );
    }

    _onChangeLastName = (text) => {
        this.setState( {updateLastName: text} );
    }

    _addStudent = async () => {
        this.props.closeForm();
        addStudent(this.props.locationId, this.state.updateFirstName, this.state.updateLastName, this.props.checkError, this.updateStudentRedux);
    }

    _updateStudent = () => {
        this.props.closeForm();
        updateStudent(this.props.id, this.props.locationId, this.state.updateFirstName, this.state.updateLastName, this.props.checkError, this.updateStudentRedux);
    }

    _deleteStudent = () => {
        this.props.closeForm();
        Alert.alert(
            'Are you sure?',
            'Deleting this student will remove all the attendance for this user too.',
            [
                {
                    text: 'Yes', 
                    onPress: () => deleteStudent(this.props.id, this.props.locationId, this.props.checkError, this.updateStudentRedux)
                },
                {
                    text: 'No',
                    style: 'cancel'
                }
            ],
            {cancelable: true},
          );
        
    }

    updateStudentRedux = (response) => {
        this.props.updateStudents(response);
    }

    render() {
        return (
            <Modal visible={this.state.visible} transparent={true} animationType='slide'>
                <View style={styles.wrapper}>
                    <View style={styles.innerWrapper}>
                        <View style={styles.cancelWrapper}>
                            <Icon iconStyle={styles.cancelButton} type='material-community' 
                                name='close' color='#d00000' onPress={this.props.closeForm} />
                        </View>
                        <View style={styles.inputWrapper}>
                            <FormInput name='First name' value={this.state.updateFirstName} onChangeText={this._onChangeFirstName} />
                            <FormInput name='Last name' value={this.state.updateLastName} onChangeText={this._onChangeLastName} />
                        </View>
                        <View style={styles.buttonWrapper}>
                            {(this.props.type === 'Edit') ?
                                (this.props.admin === 1) ?
                                    <React.Fragment>
                                        <Button buttonStyle={styles.updateButton} title='Update' onPress={this._updateStudent} />
                                        <Button buttonStyle={styles.deleteButton} title='Delete' onPress={this._deleteStudent} />
                                    </React.Fragment> 
                                :
                                    <Button buttonStyle={styles.updateButton} title='Update' onPress={this._updateStudent} />
                            :
                                <Button buttonStyle={styles.addButton} title='Add' onPress={this._addStudent} />}
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

// get data through props
const mapStateToProps = (state) => {
    return {
        students: state.userInfo.students,
        admin: state.userInfo.admin
    }
}

// set data through props
const mapDispatchToProps = dispatch => {
    return {
        updateStudents: (students) => {
            dispatch(setDefaultLocationStudents(students));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);
