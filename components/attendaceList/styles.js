import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        height: hp(7),
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6'
    },
    firstColumn: {
        flex: 8,
        justifyContent: 'center'
    },
    secondColumn: {
        flex: 2,
        justifyContent: 'center'
    },
    studentName: {
        fontSize: wp(5),
        color: '#d00000'
    },
    checkBoxSize: wp(10),
})