import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utils/responsiveScreen';

export default StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    innerWrapper: {
        width: wp(60),
        height: hp(15),
        padding: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fefdfa'
    },
    successText: {
        textAlign: 'center',
        color: '#00b300',
        fontSize: wp(5),
    },
    errorText: {
        textAlign: 'center',
        color: '#d00000',
        fontSize: wp(5),
    },
});