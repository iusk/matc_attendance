import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    addButtonWrapper: {
        position: 'absolute',
        left: wp(75),
        top: hp(65),
        borderWidth: 1,
        height: hp(10),
        width: hp(10),
        borderRadius: hp(5),
        borderColor: '#b3b3b3',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2'
    },
    iconSize: wp(12)
});