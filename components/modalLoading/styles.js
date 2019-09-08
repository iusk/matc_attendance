import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from '../../utils/responsiveScreen';

export default StyleSheet.create({
    modalContentWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContentSecWrapper: {
        width: wp(50),
        height: wp(30),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fefdfa'
    },
    modalText: {
        textAlign: 'center',
    },
});