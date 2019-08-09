import React from 'react';
import { connect } from 'react-redux';
import { CustomAdminList, ModalMessage, LocationForm } from '../../../../components';

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
            formType: '',
            messageModalVisible: false,
            messageModalSuccess: true,
            messageModalType: ''
        }
    }

    openForm = (name, type, id) => {
        this.setState( {
            formType: type,
            name: name,
            id: id,
            formVisible: true,
        } );
    }

    closeForm = () => {
        this.setState( {formVisible: false} );
    }
    
    checkError = (response, type) => {
        console.log(this.props.locations);
        if (response === 'SUCCESS') {
            this._displaySuccessMessage(type);
        } else {
            this._displayErrorMessage(type);
        }
    }

    _displaySuccessMessage = (type) => {
        this.setState( {
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
                {this.state.locations.map( location => 
                    <CustomAdminList 
                        key={key++} 
                        id={location.id} 
                        name={location.name} 
                        type='location'
                        checkError={this.checkError}
                        openForm={this.openForm}
                    />)
                }
                <ModalMessage
                    name='Location'
                    visible={this.state.messageModalVisible} 
                    type={this.state.messageModalType}
                    success={this.state.messageModalSuccess}
                />
                <LocationForm 
                    visible={this.state.formVisible}
                    name={this.state.name}
                    id={this.state.id}
                    checkError={this.checkError}
                    type={this.state.formType}
                    closeForm={this.closeForm}
                />
            </React.Fragment>
        );
    }
}

// get data through props
const mapStateToProps = (state) => {
    return {
        locations: state.adminInfo.locations,
        users: state.adminInfo.users
    }
}

export default connect(mapStateToProps)(ManageLocationsScreen)
