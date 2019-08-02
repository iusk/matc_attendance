import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import AuthLoadingScreen from './screens/authloading';
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import ProfileScreen from './screens/profile';

// creating a stack for authentication pages
const AuthStack = createStackNavigator({
    Login: LoginScreen
});

// creating a stack for home pages
const HomeStack = createStackNavigator({
    Home: HomeScreen
});

// creating a stack for profile pages
const ProfileStack = createStackNavigator({
    Profile: ProfileScreen
});

// combining the stacks (except authentication stack) to create a bottom tab navigator
const AppTabNavigator = createBottomTabNavigator({
    Home: HomeStack,
    Profile: ProfileStack
},
{
    tabBarOptions: {
        activeBackgroundColor: '#d00000',
        inactiveBackgroundColor: 'tomato',
        activeTintColor: '#fefdfa',
        inactiveTintColor: '#fefdfa'
    }
}
);

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