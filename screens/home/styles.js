import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utils/responsiveScreen';

export default StyleSheet.create({
    attendanceTakenWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: wp(2),
    },
    attendanceTakenMsg: {
        textAlign: 'center',
        color: '#00b300',
        fontSize: wp(5),
    },
    gap: {
        height: hp(5)
    },
    attendanceTakenNote: {
        textAlign: 'center',
        color: '#8c8c8c',
        fontSize: wp(4),
    },
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
    submitButton: {
        width: wp(80),
        height: hp(5)
    },
});