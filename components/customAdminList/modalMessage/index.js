import React from 'react';
import { Modal, View, Text } from 'react-native';
import styles from './styles';

class ModalMessage extends React.Component {
    render() {
        // props -> success, type, visible
        return (
            <Modal visible={this.props.visible} transparent={true} animationType='fade'>
                <View style={styles.wrapper}>
                    <View style={styles.innerWrapper}>
                        <Text style={styles.text}>{this.props.msg}</Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default ModalMessage;