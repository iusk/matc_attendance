import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    wrapper: {
        marginTop: hp(1),
        marginBottom: hp(1)
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#c7c8ca',
        marginLeft: wp(2.5),
        marginRight: wp(2.5),
    },
    label: {
        color: '#8c8c8c',
        marginLeft: wp(2.5),
        fontSize: wp(5),
    },
    input: {
        flex: 9,
        padding: wp(2),
        fontSize: wp(5),
    },
    icon: {
        flex: 1
    },
    iconSize: wp(8)
});