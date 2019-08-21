import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        height: hp(7),
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6'
    },
    firstColumn: {
        flex: 8,
        justifyContent: 'center'
    },
    secondColumn: {
        flex: 2,
        justifyContent: 'center'
    },
    buttonWrapper: {
        marginTop: hp(5),
        height: hp(7),
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        color: '#8c8c8c',
        fontSize: wp(5),
    },
    studentName: {
        fontSize: wp(5),
        color: '#d00000'
    },
    checkBoxSize: wp(10),
    submitButton: {
        width: wp(80),
        height: hp(5)
    },
});