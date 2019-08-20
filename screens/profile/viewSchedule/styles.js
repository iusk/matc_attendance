import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    wrapper: {
        backgroundColor: '#f2f2f2',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
        height: hp(20),
        padding: wp(2.5)
    },
    locationWrapper: {
        flex: 6,
        alignItems: 'center'
    },
    scheduleWrapper: {
        flex: 4,
        justifyContent: 'center'
    },
    location: {
        fontSize: wp(8),
        color: '#d00000',
        fontWeight: '400'
    },
    schedule: {
        fontSize: wp(5)
    }
});