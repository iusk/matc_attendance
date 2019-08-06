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
        flex: 7
    },
    touchableOpacityWrapper: {
        flex: 3,
        height: hp(10),
        alignItems: 'center'
    },
    touchableOpacitySecWrapper: {
        borderWidth: 1,
        borderRadius: hp(5),
        height: hp(10),
        width: hp(10)
    },
    text: {
        fontSize: wp(5),
        color: '#d00000',
        marginLeft: wp(2.5)
    },
    iconSize: wp(10)
});