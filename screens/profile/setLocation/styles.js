import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    wrapper: {
        marginBottom: wp(5),
    },
    label: {
        color: '#8c8c8c',
        marginLeft: wp(2.5),
        fontSize: wp(5),
    },
});

