import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import LocationForm from './locationForm';
import ModalMessage from '../modalMessage';
import styles from './styles';

class LocationList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formVisible: false,
            messageModalType: '',
            messageModalSuccess: true,
            messageModalVisible: false
        }

        this.closeForm = this.closeForm.bind(this);
    }

    openForm = () => {
        this.setState( {formVisible: true} );
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
        this.setState( {
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
            <View style={styles.wrapper}>
                <View style={styles.textWrapper}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.text}>{this.props.name}</Text>
                </View>
                <View style={styles.touchableOpacityWrapper}>
                    <TouchableOpacity style={styles.iconWrapper} onPress={this.openForm}>
                        <Icon type='material-icons' name='edit-location' size={styles.iconSize} color='#d00000' />
                    </TouchableOpacity>
                </View>
                <LocationForm 
                    visible={this.state.formVisible}
                    name={this.props.name}
                    id={this.props.id}
                    checkError={this.checkError}
                    type='edit'
                    closeForm={this.closeForm}
                />
                <ModalMessage 
                    visible={this.state.messageModalVisible} 
                    type={this.statemessageModalType} 
                    success={this.state.messageModalSuccess}
                />
            </View>
        );
    }
}

export default LocationList;
