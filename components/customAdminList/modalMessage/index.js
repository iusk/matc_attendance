import React from 'react';
import { Modal, View, Text } from 'react-native';
import styles from './styles';

class ModalMessage extends React.Component {
    render() {
        let msg = '';
        // props -> success, type, visible, name
        switch(this.props.type) {
            case 'Update':
                msg = (this.props.success) ? this.props.name + ' updated successfully.' : this.props.name + ' couldn\'t be updated.';
            case 'Delete':
                msg = (this.props.success) ? this.props.name + ' removed successfully.' : this.props.name + ' couldn\'t be removed.';
            case 'Add':
                msg = (this.props.success) ? this.props.name + ' added successfully.' : this.props.name + 'couldn\'t be added.';
        }
        return (
            <Modal visible={this.props.visible} transparent={true} animationType='fade'>
                <View style={styles.wrapper}>
                    <View style={styles.innerWrapper}>
                        <Text style={styles.text}>{msg}</Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default ModalMessage;