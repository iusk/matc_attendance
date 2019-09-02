import { createStackNavigator } from 'react-navigation';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/login/register';
import ForgotPasswordScreen from '../screens/login/forgotPassword';
import HomeScreen from '../screens/home';
import ReportScreen from '../screens/report';
import ProfileScreen from '../screens/profile';
import ChangePasswordScreen from '../screens/profile/changePassword';
import AdminScreen from '../screens/profile/admin';
import ManageLocationsScreen from '../screens/profile/admin/manageLocations'
import ManageUsersScreen from '../screens/profile/admin/manageUsers';
import SetLocationScreen from '../screens/profile/setLocation';
import ManageStudentsScreen from '../screens/profile/manageStudents';
import ViewScheduleScreen from '../screens/profile/viewSchedule';

// creating a stack for authentication pages
const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
    ForgotPassword: ForgotPasswordScreen,
});

// creating a basic stack for users with no locations assigned
const BasicStack = createStackNavigator({
    ProfileOnly: ProfileScreen,
    ChangePasswordBasic: ChangePasswordScreen
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
    ChangePassword: ChangePasswordScreen,
    Admin: AdminScreen,
    ManageLocations: ManageLocationsScreen,
    ManageUsers: ManageUsersScreen,
    SetCurrentLocation: SetLocationScreen,
    ManageStudents: ManageStudentsScreen,
    ViewSchedule: ViewScheduleScreen,
});

export { AuthStack, BasicStack, HomeStack, ReportStack, ProfileStack };