import React from 'react';
import { Modal, View, Text } from 'react-native';
import styles from './styles';

class ModalMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let styleText;
        if (this.props.success) {
            styleText = styles.successText;
        } else {
            styleText = styles.errorText;
        }
        return (
            <Modal visible={this.props.visible} transparent={true} animationType='fade'>
                <View style={styles.wrapper}>
                    <View style={styles.innerWrapper}>
                        <Text style={styleText}>{this.props.msg}</Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default ModalMessage;