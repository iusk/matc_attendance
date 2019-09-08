import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utils/responsiveScreen';

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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    iconWrapper: {
        borderWidth: 1,
        borderRadius: hp(3),
        borderColor: '#d00000',
        backgroundColor: '#d00000',
        height: hp(6),
        width: hp(6),
        justifyContent: 'center'
    },
    text: {
        fontSize: wp(5),
        color: '#d00000',
        marginLeft: wp(2.5)
    },
    iconSize: wp(8)
});