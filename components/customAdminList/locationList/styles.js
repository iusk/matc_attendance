import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
        height: hp(10),
        alignItems: 'center'
    },
    textWrapper: {
        flex: 8
    },
    touchableOpacityWrapper: {
        flex: 2,
        height: hp(10),
        justifyContent: 'center'
    },
    iconWrapper: {
        borderWidth: 1,
        borderRadius: hp(4),
        borderColor: '#b3b3b3',
        height: hp(8),
        width: hp(8),
        justifyContent: 'center'
    },
    text: {
        fontSize: wp(5),
        color: '#d00000',
        marginLeft: wp(2.5)
    },
    iconSize: wp(12)
});