import React from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { getDefaultLocationId } from '../../../data/asyncStorage';
import { ModalMessage, StudentList, StudentForm } from '../../../components';
import styles from './styles';

class ManageStudentsScreen extends React.Component {
    static navigationOptions = {
        title: 'Manage Students',
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
            students: this.props.students,
            formVisible: false,
            formType: '',
            id: 0,
            locationId: 0,
            firstName: '',
            lastName: '',
            messageModalVisible: false,
            messageModalSuccess: true,
            messageModalType: ''
        }
    }

    openForm = (id, locationId, firstName, lastName, type) => {
        this.setState({
            id: id,
            locationId: locationId,
            firstName: firstName,
            lastName: lastName,
            formType: type,
            formVisible: true,
        });
    }

    closeForm = () => {
        this.setState( {formVisible: false} );
    }
    
    checkError = (type, error) => {
        if (!error) {
            this._displaySuccessMessage(type);
        } else {
            this._displayErrorMessage(type);
        }
    }

    _displaySuccessMessage = (type) => {
        this.setState({
            students: this.props.students,
            messageModalVisible: true,
            messageModalSuccess: true,
            messageModalType: type
        });
        setTimeout( () => {
            this.setState( {messageModalVisible: false})
        }, 500);
    }

    _displayErrorMessage = (type) => {
        this.setState( {
            students: this.props.students,
            messageModalVisible: true,
            messageModalSuccess: false,
            messageModalType: type
        });
        setTimeout( () => {
            this.setState( {messageModalVisible: false})
        }, 500);
    }

    render() {
        return (
            <React.Fragment>
                <ScrollView>
                    {this.state.students.map( student => 
                        <StudentList 
                            key={student.id} 
                            id={student.id}
                            locationId={student.locationId}
                            firstName={student.firstName}
                            lastName={student.lastName}
                            checkError={this.checkError}
                            onPress={this.openForm}
                        />)
                    }
                </ScrollView>
                <ModalMessage
                    name='Student'
                    visible={this.state.messageModalVisible} 
                    type={this.state.messageModalType}
                    success={this.state.messageModalSuccess}
                />
                <StudentForm 
                    visible={this.state.formVisible}
                    id={this.state.id}
                    locationId={this.state.locationId}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    checkError={this.checkError}
                    type={this.state.formType}
                    closeForm={this.closeForm}
                />
                <TouchableOpacity style={styles.addButtonWrapper} 
                            onPress={async () => this.openForm(null, await getDefaultLocationId(), '', '', 'Add')}>
                    <Icon type='material-community' name='account-plus' color='#fefdfa' size={styles.iconSize} />
                </TouchableOpacity>
            </React.Fragment>
        );
    }
}

// get data through props
const mapStateToProps = (state) => {
    return {
        students: state.userInfo.students
    }
}

export default connect(mapStateToProps)(ManageStudentsScreen);