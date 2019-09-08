import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utils/responsiveScreen';

export default StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    innerWrapper: {
        width: wp(75),
        height: hp(50),
        backgroundColor: '#fefdfa'
    },
    cancelWrapper: {
        flex: 1,
        flexDirection: 'row-reverse'
    },
    inputWrapper: {
        flex: 5,
    },
    buttonWrapper: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    cancelButton: {
        marginRight: wp(5),
        marginTop: hp(2)
    },
    notRegistered: {
        textAlign: 'center',
        color: '#d00000',
        fontSize: wp(4),
    },
    addButton: {
        width: wp(60),
        height: hp(5)
    },
    updateButton: {
        width: wp(30),
        height: hp(5)
    },
    deleteButton: {
        width: wp(30),
        height: hp(5),
        backgroundColor: '#d00000'
    },
});