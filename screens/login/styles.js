import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

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
        fontSize: wp(8),
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium',
        color: '#fefdfa'
    },
    horizontalRule: {
        width: wp(30),
        margin: wp(10),
        borderBottomWidth: 1,
        borderColor: '#fefdfa'
    },
    heading: {
        fontSize: wp(6),
        fontFamily: 'sans-serif-medium',
        color: '#fefdfa'
    },
    gap: {
        height: wp(5)
    },
    button: {
        width: wp(50),
        marginTop: wp(8),
        backgroundColor: '#fefdfa',
    },
    buttonText: {
        fontSize: wp(4),
        color: '#d00000',
        fontFamily: 'sans-serif-medium'
    },
    buttonLoading: {
        color: '#d00000'
    }
});