import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import AuthLoadingScreen from './screens/authloading';

// creating a stack for authentication pages
const AuthStack = createStackNavigator({
    Login: LoginScreen
});

// creating a stack for home pages
const HomeStack = createStackNavigator({ 
    Home: HomeScreen
});

// combining the stacks (except authentication stack) to create a bottom tab navigator
const AppTabNavigator = createBottomTabNavigator({
    Home: HomeStack
});

// combining the tab navigator, authentication stack and authentication screen
// and separating their stacks, which prevents users from pressing back to go to
// another stack but still allows going back on the same stack
export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppTabNavigator,
        Auth: AuthStack
    },
    {
        initialRouteName: 'AuthLoading'
    }
));