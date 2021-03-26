import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContents } from './DrawerContents';
 
import MyStack from './StackNavigation';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
    const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
            drawerContent={ props => <DrawerContents {...props} /> } 
            drawerType={dimensions.width >= 768  ? 'permanent' : 'front'}  
            drawerStyle={{ width: '75%' }}
            drawerContentOptions={{
                activeTintColor: '#000',
                itemStyle: { marginVertical: 10 },
            }}
        >
      <Drawer.Screen name="Stack" component={MyStack} />
      {/* <Drawer.Screen name="Article" component={Article} /> */}
    </Drawer.Navigator> 
  );
}