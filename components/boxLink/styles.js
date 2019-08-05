import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    contentWrapper: {
        width: wp(45),
        height: hp(20),
        margin: wp(2.5),
        borderWidth: 1,
        borderColor: '#e6e6e6',
        backgroundColor: '#f2f2f2'
    },
    icon: {
        marginTop: hp(2.5),
        marginBottom: hp(2.5)
    },
    iconSize: wp(15),
    text: {
        fontSize: 20,
        color: '#d00000',
        textAlign: 'center'
    }
});