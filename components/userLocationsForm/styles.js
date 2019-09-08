import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utils/responsiveScreen';

export default StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    label: {
        color: '#8c8c8c',
        marginLeft: wp(2.5),
        fontSize: wp(5),
    },
    innerWrapper: {
        width: wp(80),
        height: hp(80),
        backgroundColor: '#fefdfa'
    },
    cancelWrapper: {
        flex: 1,
        flexDirection: 'row-reverse'
    },
    locationWrapper: {
        flex: 5
    },
    cancelButton: {
        marginRight: wp(5),
        marginTop: hp(2)
    },
});