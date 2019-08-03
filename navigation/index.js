import { AuthStack } from './stacks';
import AuthLoadingScreen from '../screens/authloading';
import BottomTabNavigator from './bottomTabNavigator';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

// combining the tab navigator, authentication stack and authentication screen
// and separating their stacks, which prevents users from pressing back to go to
// another stack but still allows going back on the same stack
export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: BottomTabNavigator,
        Auth: AuthStack
    },
    {
        initialRouteName: 'AuthLoading'
    }
));