import React from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { ModalMessage, LocationForm, LocationList } from '../../../../components';
import styles from './styles';

class ManageLocationsScreen extends React.Component {
    static navigationOptions = {
        title: 'Manage Locations',
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
            locations: this.props.locations,
            formVisible: false,
            name: '',
            day: 0,
            startTime: '',
            endTime: '',
            formType: '',
            messageModal: '',
            messageModalVisible: false,
            messageModalSuccess: true,
        }
    }

    openForm = (id, name, day, startTime, endTime, type) => {
        this.setState({
            id: id,
            name: name,
            day: day,
            startTime: startTime,
            endTime: endTime,
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
        let msg = '';
        switch(type) {
            case 'Add':
                msg = 'Location added successfully!';
                break;
            case 'Update':
                msg = 'Location updated successfully!';
                break;
            case 'Delete':
                msg = 'Location removed successfully!';
                break;
        }
        this.setState({
            locations: this.props.locations,
            messageModal: msg,
            messageModalVisible: true,
            messageModalSuccess: true,
        });
        setTimeout( () => {
            this.setState( {messageModalVisible: false})
        }, 500);
    }

    _displayErrorMessage = (type) => {
        let msg = '';
        switch(type) {
            case 'Add':
                msg = 'Location couldn\'t be added.';
                break;
            case 'Update':
                msg = 'Location couldn\'t be updated.';
                break;
            case 'Delete':
                msg = 'Location couldn\'t be deleted.';
                break;
        }
        this.setState( {
            locations: this.props.locations,
            messageModal: msg,
            messageModalVisible: true,
            messageModalSuccess: false,
        });
        setTimeout( () => {
            this.setState( {messageModalVisible: false})
        }, 500);
    }

    render() {
        return (
            <React.Fragment>
                <ScrollView>
                    {this.state.locations.map( location => 
                        <LocationList 
                            key={location.id} 
                            id={location.id} 
                            name={location.name}
                            iconName='edit-location'
                            day={location.day}
                            startTime={location.startTime}
                            endTime={location.endTime}
                            checkError={this.checkError}
                            onPress={this.openForm}
                        />)
                    }
                </ScrollView>
                <ModalMessage
                    msg={this.state.messageModal}
                    visible={this.state.messageModalVisible}
                    success={this.state.messageModalSuccess}
                />
                <LocationForm 
                    visible={this.state.formVisible}
                    id={this.state.id}
                    name={this.state.name}
                    day={this.state.day}
                    startTime={this.state.startTime}
                    endTime={this.state.endTime}
                    checkError={this.checkError}
                    type={this.state.formType}
                    closeForm={this.closeForm}
                />
                <TouchableOpacity style={styles.addButtonWrapper} onPress={() => this.openForm(null, '', 0, '', '', 'Add')}>
                    <Icon type='material-community' name='map-marker-plus' color='#fefdfa' size={styles.iconSize} />
                </TouchableOpacity>
            </React.Fragment>
        );
    }
}

// get data through props
const mapStateToProps = (state) => {
    return {
        locations: state.adminInfo.locations
    }
}

export default connect(mapStateToProps)(ManageLocationsScreen);