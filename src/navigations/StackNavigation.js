import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native'; 
import Icon from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

import AuthenticationScreen from '../auth'; 

import LoginScreen from '../auth/login';
import RegisterScreen from '../auth/register';
import ResetScreen from '../auth/reset';
 
import indexScreen from '../settings';
import aboutYouScreen from '../settings/aboutYou';
import unitOfMeasureScreenfrom from '../settings/unitOfMeasure';
import workSettingsScreen from '../settings/workSettings';
import countrySettingsScreen from '../settings/countrySettings';

import previewVideoScreen from '../videos';
import workOutVideoScreen from '../videos/videoWorkOut';
import SavedScreen from '../saved';

import subSearchCategory from '../subSearch';


import ActivityTab from '../activities'

import MyTabs from './TopBarNavs';

const Stack = createStackNavigator();

const CustomNavigationBar = ({ navigation, previous }) =>{
  return(
    <View style={styles.col} > 
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Icon name="md-remove" color='#000' size={26}  />  
        <Icon name="md-remove" color='#000' size={26} style={styles.minusIcon} />  
      </TouchableOpacity>
      <View style={styles.avartarContainer}>
        <Image
            source={require('../../assets/icon.png')}
            style={styles.avatar}
        />
      </View>
    </View>
  )
}

export default function MyStack() {
  
  return (
    <Stack.Navigator 
        headerMode={'screen'}
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      >
      <Stack.Screen name="Authentication" options={{headerShown: false}} component={AuthenticationScreen} /> 
      <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} /> 
      <Stack.Screen name="Register" options={{headerShown: false}} component={RegisterScreen} /> 
      <Stack.Screen name="Reset" options={{headerShown: false}} component={ResetScreen} /> 
 
       
      <Stack.Screen name="Home" component={MyTabs} /> 
      
      <Stack.Screen name="subSearch" options={{headerShown: false}} component={subSearchCategory} />  

      <Stack.Screen name="Settings" options={{headerShown: false}} component={indexScreen} />  
      <Stack.Screen name="aboutYouSettings" options={{headerShown: false}} component={aboutYouScreen} />  
      <Stack.Screen name="uniteOfMesaureSettings" options={{headerShown: false}} component={unitOfMeasureScreenfrom} />  
      <Stack.Screen name="workSettings" options={{headerShown: false}} component={workSettingsScreen} /> 
      <Stack.Screen name="countrySettings" options={{headerShown: false}} component={countrySettingsScreen} /> 
      
      
      <Stack.Screen name="Saved"  options={{headerShown: false}} component={SavedScreen} /> 
      

      <Stack.Screen name="previewVideo"  options={{headerShown: false}} component={previewVideoScreen} /> 
      <Stack.Screen name="workOutVideo"  options={{headerShown: false}} component={workOutVideoScreen} /> 
      
      
      <Stack.Screen name="Activity"  component={ActivityTab} /> 
      
    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({ 
  minusIcon:{
      marginTop: -20,
      marginLeft: 5,
  },
  col:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  avartarContainer: {
    width: '50%',
    alignItems: 'flex-end',
  },
  avatar:{
    width: 40,
    height: 40,borderRadius: 20,
  },
});