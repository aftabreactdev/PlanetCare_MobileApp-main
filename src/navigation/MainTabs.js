import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import MainDashboardScreen from '../screens/dashboard/MainDashboardScreen';
import CheckinScreen from '../screens/checkin/CheckinScreen';
import WelcomeJournal from '../screens/journaling/WelcomeJournal';
import InsightsScreen from '../screens/insights/InsightsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

import HomeDashboad2 from '../screens/dashboard/HomeDashboad2';
import NotificationItem from '../screens/dashboard/NotificationItem';

// Profile related screens
import PrivacyScreen from '../screens/profile/PrivacyScreen';
import Language from '../screens/profile/Language';
import Notificationssetting from '../screens/profile/Notificationssetting';
import ProfileScreen3 from '../screens/profile/ProfileScreen3';

// ✅ Journal related screens
import WriteJournal from '../screens/journaling/WriteJournal';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/* ===================== HOME STACK ===================== */

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MinifeedMain" component={MainDashboardScreen} />
      <Stack.Screen name="HomeDashboad2" component={HomeDashboad2} />
      <Stack.Screen name="NotificationItem" component={NotificationItem} />
    </Stack.Navigator>
  );
}

/* ===================== JOURNAL STACK ===================== */

function JournalStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeJournal" component={WelcomeJournal} />
      <Stack.Screen name="WriteJournal" component={WriteJournal} />
    </Stack.Navigator>
  );
}

/* ===================== PROFILE STACK ===================== */

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="ProfileScreen3" component={ProfileScreen3} />
      <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen
        name="Notificationssetting"
        component={Notificationssetting}
      />
    </Stack.Navigator>
  );
}

/* ===================== TABS ===================== */

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

          if (route.name === 'Minifeed') {
            imageSource = require('../assets/icons/Minifeed.png');
          } else if (route.name === 'Checkin') {
            imageSource = require('../assets/icons/Pods.png');
          } else if (route.name === 'Journal') {
            imageSource = require('../assets/icons/Resources.png');
          } else if (route.name === 'Insights') {
            imageSource = require('../assets/icons/Insights.png');
          }

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
      <Tab.Screen name="Minifeed" component={HomeStack} />
      <Tab.Screen name="Checkin" component={CheckinScreen} />
      <Tab.Screen name="Insights" component={InsightsScreen} />
      <Tab.Screen name="Journal" component={JournalStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
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