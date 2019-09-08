import React from 'react';
import { Alert, NetInfo } from 'react-native';

class CheckConnection extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectivityChange);
    }

    _handleConnectivityChange = isConnected => {
        if (!isConnected) {
            Alert.alert(
                'No Connection',
                'Please make sure that your device is connected to the internet.',
                [
                    {
                        text: 'Retry', 
                        onPress: () => this._checkConnectivity()
                    },
                ],
                {cancelable: false},
            );
        }
    }

    _checkConnectivity = () => {
        NetInfo.isConnected.fetch().then(isConnected => {
            this._handleConnectivityChange(isConnected)
        });
    }

    render() {
        return ( null );
    }
}

export default CheckConnection;