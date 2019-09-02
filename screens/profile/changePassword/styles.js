import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    wrapper: {
        flex: 1,
        marginTop: 10
    },
    buttonWrapper: {
        alignItems: 'center',
        marginTop: 20
    },
    button: {
        width: wp(50)
    },
    info: {
        textAlign: 'center',
        color: '#8c8c8c',
        fontSize: wp(5),
        marginTop: 20
    }
})