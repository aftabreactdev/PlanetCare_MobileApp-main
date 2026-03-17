import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainDashboardScreen from '../screens/dashboard/MainDashboardScreen';
import CheckinScreen from '../screens/checkin/CheckinScreen';
import JournalingScreen from '../screens/journaling/JournalingScreen';
import InsightsScreen from '../screens/insights/InsightsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

function TabLabel({ label, focused }) {
  return (
    <Text style={[styles.tabLabel, focused && styles.activeTabLabel]}>
      {label}
    </Text>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={MainDashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabLabel label="Home" focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="Checkin"
        component={CheckinScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabLabel label="Check-in" focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="Journal"
        component={JournalingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabLabel label="Journal" focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabLabel label="Insights" focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabLabel label="Profile" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 18,
    height: 68,
    backgroundColor: '#121F3D',
    borderRadius: 24,
    borderTopWidth: 0,
    paddingTop: 10,
    paddingBottom: 10,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabLabel: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 11,
    fontWeight: '600',
    width: 68,
    textAlign: 'center',
  },
  activeTabLabel: {
    color: '#FFC83D',
  },
});