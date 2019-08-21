import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import AuthLoadingScreen from './screens/authloading';

const AppStack = createStackNavigator({ 
    Home: HomeScreen
});
const AuthStack = createStackNavigator({
    Login: LoginScreen
});

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack
    },
    {
        initialRouteName: 'AuthLoading'
    }
));