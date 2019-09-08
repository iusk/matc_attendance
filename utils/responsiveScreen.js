import { Dimensions } from 'react-native';

const widthPercentageToDP = (percentage) => {
    const width = Dimensions.get('window').width;
    return (percentage / 100) * width;
}

const heightPercentageToDP = (percentage) => {
    const height = Dimensions.get('window').height;
    return (percentage/100) * height;
}

export { widthPercentageToDP, heightPercentageToDP }