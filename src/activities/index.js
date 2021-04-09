import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

import HistoryScreen from './history'; 
import AchievementsScreen from './achivments';

import MyTopTabBar from '../navigations/MyTopTabBar';

export default function ActivityTab() {
  return (
    <Tab.Navigator tabBar={props => <MyTopTabBar {...props} /> }> 
      <Tab.Screen name="History" component={HistoryScreen} /> 
      <Tab.Screen name="Achievements" component={AchievementsScreen} /> 
    </Tab.Navigator>
  );
}