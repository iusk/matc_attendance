import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';

const AppNavigator = createStackNavigator(
    {
        Login: LoginScreen,
        Home: HomeScreen
    },
    {
        initialRouteName: "Login"
    }
);

export default createAppContainer(AppNavigator);