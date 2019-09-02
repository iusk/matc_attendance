import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    info: {
        textAlign: 'center',
        color: '#8c8c8c',
        fontSize: wp(5),
        marginTop: 20,
        marginBottom: 20
    }
});