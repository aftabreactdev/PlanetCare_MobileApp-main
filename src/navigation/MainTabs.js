import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import MainDashboardScreen from '../screens/dashboard/MainDashboardScreen';
import CheckinScreen from '../screens/checkin/CheckinScreen';
import JournalingScreen from '../screens/journaling/JournalingScreen';
import InsightsScreen from '../screens/insights/InsightsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Dummy = ({ title }) => (
  <View style={styles.screen}>
    <Text>{title}</Text>
  </View>
);

// Example stack for Home (like MinifeedStack)
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Minifeed" component={MainDashboardScreen} />
      <Stack.Screen name="Details" component={() => <Dummy title="Details Screen" />} />
    </Stack.Navigator>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#4FC3F7',
        tabBarInactiveTintColor: 'gray',
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused }) => {
          if (route.name === 'Profile') {
            return (
              <Icon
                name="person"
                size={22}
                color={focused ? '#4FC3F7' : 'gray'}
              />
            );
          }

          let imageSource;

          if (route.name === 'Minifeed')
            imageSource = require('../assets/icons/Minifeed.png');
          else if (route.name === 'Checkin')
            imageSource = require('../assets/icons/Pods.png');
          else if (route.name === 'Journal')
            imageSource = require('../assets/icons/Resources.png');
          else if (route.name === 'Insights')
            imageSource = require('../assets/icons/Insights.png');

          return (
            <Image
              source={imageSource}
              style={{
                width: 22,
                height: 22,
                tintColor: focused ? '#4FC3F7' : 'gray',
              }}
            />
          );
        },
      })}
    >
      {/* Home with Stack */}
      <Tab.Screen name="Minifeed" component={HomeStack} />

      <Tab.Screen
        name="Checkin"
        component={CheckinScreen}
      />

        <Tab.Screen
        name="Insights"
        component={InsightsScreen}
      />

      <Tab.Screen
        name="Journal"
        component={JournalingScreen}
      />

    

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
   height: 68,
    backgroundColor: '#000',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
});
