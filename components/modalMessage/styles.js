import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    innerWrapper: {
        width: wp(50),
        height: hp(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fefdfa'
    },
    text: {
        textAlign: 'center',
    },
});