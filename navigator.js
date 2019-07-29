import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './screens/login';

const AppNavigator = createStackNavigator(
    {
        Login: LoginScreen
    },
    {
        initialRouteName: "Login"
    }
);

export default createAppContainer(AppNavigator);