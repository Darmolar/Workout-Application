import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, ActivityIndicator  } from 'react-native'; 
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
 
export default function AuthenticationScreen ({navigation}) { 
  const [ loading, setLoading] = useState(false);
   useEffect(() => {
     getData();
  },[])

  const getData = async () => {
    setLoading(true)
    var token = await AsyncStorage.getItem('token');
    var userDetails = await AsyncStorage.getItem('userDetails');
    // console.log(token);
    if(token !== null && userDetails !== null){
      navigation.navigate('Home', { screen: 'Dashboard' }) 
    } else{
      setLoading(false)
    }
    return true;
  } 

  if(loading == true){
      return (
          <View style={styles.appLoading}>
              <ActivityIndicator color="#000" size="large" />
          </View>
      )
    }
    return (
        <Animatable.View style={styles.container} >
            <Animatable.View style={{ ...StyleSheet.absoluteFill }} >
                <Image
                    source={require('../../assets/bg2.jpg')}
                    style={{ flex: 1, height: null, width: null, zIndex: -1 }}
                />
            </Animatable.View> 
            <View style={{ height: height / 3 }} > 
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Animatable.View animation="slideInDown" easing={'linear'} style={[styles.button, { backgroundColor: 'transparent' }]} >
                        <Text style={[styles.buttonText, { color: '#FFF' }]}>SIGN IN</Text>
                    </Animatable.View> 
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigation.navigate('Register')}>
                    <Animatable.View animation="slideInUp" easing={'linear'} style={[styles.button ]}>
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </Animatable.View>
                </TouchableOpacity>
            </View>

        </Animatable.View>
    ); 
}

const styles = StyleSheet.create({
  appLoading:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    justifyContent: 'flex-end',
    zIndex: -1
  },
  button:{
    backgroundColor: '#FFF',
    height: 60,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 7,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  buttonText:{
    fontSize: 20, 
    textTransform: 'uppercase',
    fontFamily: 'Raleway-Regular'
  },
  loginContainer:{
    width,
    height: 500, 
    opacity: 0,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer:{
    width,
    padding: 20,
    justifyContent: 'center',
  },
  formGroup:{
    width: '100%', 
    borderColor: 'rgba(0,0,0,0.9)',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
  },
  inputBox:{
    width: '100%',
    height: 40, 
    color: '#000',
  }
});
