import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    mainWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d00000'
    },
    titleWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    organization: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium',
        color: '#fefdfa'
    },
    horizontalRule: {
        width: 100,
        margin: 30,
        borderBottomWidth: 1,
        borderColor: '#fefdfa'
    },
    heading: {
        fontSize: 20,
        fontFamily: 'sans-serif-medium',
        color: '#fefdfa'
    },
    gap: {
        height: 30
    },
    button: {
        width: 300,
        marginTop: 10,
        backgroundColor: '#fefdfa',
    },
    buttonText: {
        color: '#d00000',
        fontFamily: 'sans-serif-medium'
    }
});