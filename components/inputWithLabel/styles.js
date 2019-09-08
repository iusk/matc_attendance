import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from '../../utils/responsiveScreen';

export default StyleSheet.create({
    wrapper: {
        width: wp(90),
        margin: wp(2),
        borderBottomWidth: 1,
        borderColor: '#fefdfa',
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    input: {
        paddingLeft: wp(1.5),
        width: wp(75),
        color: '#fefdfa'
    }
});