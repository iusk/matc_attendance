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
            messageModalVisible: false,
            messageModalSuccess: true,
            messageModalType: ''
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
    
    checkError = (response, type) => {
        if (response === 'SUCCESS') {
            this._displaySuccessMessage(type);
        } else {
            this._displayErrorMessage(type);
        }
    }

    _displaySuccessMessage = (type) => {
        this.setState({
            locations: this.props.locations,
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
            locations: this.props.locations,
            messageModalVisible: true,
            messageModalSuccess: false,
            messageModalType: type
        });
        setTimeout( () => {
            this.setState( {messageModalVisible: false})
        }, 500);
    }

    render() {
        let key = 0;
        return (
            <React.Fragment>
                <ScrollView>
                    {this.state.locations.map( location => 
                        <LocationList 
                            key={key++} 
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
                    name='Location'
                    visible={this.state.messageModalVisible} 
                    type={this.state.messageModalType}
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
                <TouchableOpacity style={styles.addButtonWrapper} onPress={() => this.openForm(null, '', 0, null, null, 'Add')}>
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