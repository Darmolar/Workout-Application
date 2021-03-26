import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

import DashboardScreen from '../dashboard';
import SearchScreen from '../search';
import CollectionScreen from '../collection';
import ForYouScreen from '../ForYou';

import MyTopTabBar from './MyTopTabBar';

export default function MyTabs() {
  return (
    <Tab.Navigator tabBar={props => <MyTopTabBar {...props} /> }> 
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Browse" component={SearchScreen} />
      <Tab.Screen name="Collection" component={CollectionScreen} />
      <Tab.Screen name="For You" component={ForYouScreen} />
    </Tab.Navigator>
  );
}