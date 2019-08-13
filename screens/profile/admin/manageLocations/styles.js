import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    addButtonWrapper: {
        position: 'absolute',
        left: wp(82),
        top: hp(72),
        borderWidth: 1,
        height: hp(8),
        width: hp(8),
        borderRadius: hp(4),
        borderColor: '#d00000',
        backgroundColor: '#d00000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconSize: wp(8)
});