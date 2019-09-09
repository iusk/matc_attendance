import React from 'react';
import { Icon, Text } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation';
import { HomeStack, ReportStack, ProfileStack } from './stacks';

// combining the stacks (except authentication stack and basic stack) to create a bottom tab navigator
const BottomTabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarIcon: ( {tintColor} ) => (
                <React.Fragment>
                    <Icon name='form' type='antdesign' color={tintColor} />
                    <Text style={ {color: tintColor} }>Take Attendance</Text>
                </React.Fragment>
            )
        }
    },
    Report: {
        screen: ReportStack,
        navigationOptions: {
            tabBarIcon: ( {tintColor} ) => (
                <React.Fragment>
                    <Icon name='profile' type='antdesign' color={tintColor} />
                    <Text style={ {color: tintColor} }>Report</Text>
                </React.Fragment>
                
            )
        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            tabBarIcon: ( {tintColor} ) => (
                <React.Fragment>
                    <Icon name='user' type='antdesign' color={tintColor} />
                    <Text style={ {color: tintColor} }>Profile</Text>
                </React.Fragment>
                
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