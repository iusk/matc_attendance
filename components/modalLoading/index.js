import React from 'react';
import {Modal, View, Text, ActivityIndicator} from 'react-native';
import styles from './styles';

class ModalLoading extends React.Component {
    render() {
        return (
            <Modal visible={this.props.visible} transparent={true} animationType='slide'>
                <View style={styles.modalContentWrapper}>
                    <View style={styles.modalContentSecWrapper}>
                        <ActivityIndicator size='large' />
                        <Text style={styles.modalText}>{this.props.msg}</Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default ModalLoading;
