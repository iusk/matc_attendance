import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from '../../utils/responsiveScreen';

export default StyleSheet.create({
    wrapper: {
        marginTop: hp(1),
        marginBottom: hp(1)
    },
    label: {
        color: '#8c8c8c',
        marginLeft: wp(2.5),
        fontSize: wp(5),
    },
    picker: {
        marginLeft: wp(2.5),
        height: hp(5),
        width: wp(50),
        fontSize: wp(5),
        padding: wp(2),
    }
});