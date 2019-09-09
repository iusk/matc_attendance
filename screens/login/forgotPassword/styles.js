import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../utils/responsiveScreen';

export default StyleSheet.create({
    mainWrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#d00000'
    },
    infoWrapper: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: wp(8),
        fontFamily: 'sans-serif-medium',
        color: '#fefdfa',
        marginBottom: hp(5)
    },
    info: {
        fontSize: wp(4),
        fontFamily: 'sans-serif-medium',
        color: '#fefdfa',
        margin: wp(2),
        textAlign: 'center'
    },
    formWrapper: {
        flex: 6,
        alignItems: 'center',
    },
    gap: {
        height: wp(5)
    },
    button: {
        width: wp(50),
        marginTop: wp(8),
        marginBottom: wp(8),
        backgroundColor: '#fefdfa',
    },
    buttonText: {
        fontSize: wp(4),
        color: '#d00000',
        fontFamily: 'sans-serif-medium'
    },
    buttonLoading: {
        color: '#d00000'
    }
});