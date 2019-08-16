import { createStackNavigator } from 'react-navigation';
import LoginScreen from '../screens/login';
import HomeScreen from '../screens/home';
import ReportScreen from '../screens/report';
import ProfileScreen from '../screens/profile';
import AdminScreen from '../screens/profile/admin';
import ManageLocationsScreen from '../screens/profile/admin/manageLocations'
import ManageUsersScreen from '../screens/profile/admin/manageUsers';
import SetLocationScreen from '../screens/profile/setLocation';

// creating a stack for authentication pages
const AuthStack = createStackNavigator({
    Login: LoginScreen
});

// creating a stack for home pages
const HomeStack = createStackNavigator({
    Home: HomeScreen
});

const ReportStack = createStackNavigator({
    Report: ReportScreen
});

// creating a stack for profile pages
const ProfileStack = createStackNavigator({
    Profile: ProfileScreen,
    Admin: AdminScreen,
    ManageLocations: ManageLocationsScreen,
    ManageUsers: ManageUsersScreen,
    SetCurrentLocation: SetLocationScreen
});

export { AuthStack, HomeStack, ReportStack, ProfileStack };