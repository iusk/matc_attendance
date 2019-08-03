import React from 'react';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation';
import { HomeStack, ReportStack, ProfileStack } from './stacks';

// combining the stacks (except authentication stack) to create a bottom tab navigator
const BottomTabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarIcon: ( {tintColor} ) => (
                <Icon name='form' type='antdesign' color={tintColor} />
            )
        }
    },
    Report: {
        screen: ReportStack,
        navigationOptions: {
            tabBarIcon: ( {tintColor} ) => (
                <Icon name='profile' type='antdesign' color={tintColor} />
            )
        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            tabBarIcon: ( {tintColor} ) => (
                <Icon name='user' type='antdesign' color={tintColor} />
            )
        }
    }
},
{
    tabBarOptions: {
        showLabel: false,
        activeBackgroundColor: '#d00000',
        inactiveBackgroundColor: 'tomato',
        activeTintColor: '#fefdfa',
        inactiveTintColor: 'gray'
    }
}
);

export default BottomTabNavigator;