import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from '../../utils/responsiveScreen';

export default StyleSheet.create({
    wrapper: {
        flex: 1
    },
    selectDateSelected: {
        flex: 1,
        alignItems: 'center'
    },
    selectDateNotSelected: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scroll: {
        flex: 9
    },
    button: {
        width: wp(50),
        backgroundColor: '#d00000',
    },
});