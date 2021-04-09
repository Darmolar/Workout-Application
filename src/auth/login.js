import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, ActivityIndicator  } from 'react-native'; 
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useDispatch, useSelector } from 'react-redux';
// import { register, login } from '../redux/docs/counter';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({navigation}) {
  const [ userData, setUserData ] = useState({});
  const [ loading, setLoading] = useState(false);
  const [ registerError, setregisterError ] = useState('');

  useEffect(() => {
     getData(); 
  },[])

  const getData = async () => {
    var token = await AsyncStorage.getItem('token');
    var userDetails = await AsyncStorage.getItem('userDetails');
    // console.log(token);
    if(token !== null && userDetails !== null){
      navigation.navigate('Home', { screen: 'Dashboard' }) 
    } 
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userDetails');
    return true;
  } 
 
  const handleIncrement = () =>{
    try { 
      setLoading(true);
      fetch(`https://quantumleaptech.org/getFit/api/v1/login`, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(userData)
          })
          .then((response) => response.json())
          .then(async (json) => {
              setLoading(false); 
              console.log(json);
              if(json.status === true){ 
                  await AsyncStorage.setItem('userDetails', JSON.stringify(json.data.user_details))
                  await AsyncStorage.setItem('token', JSON.stringify(json.data.token))
                  navigation.navigate('Home', { screen: 'Dashboard' })  
              }else{  
                  // for (const property in json.errors) { 
                      setregisterError(json.message); 
                      return false;
                  // }
              }
      })
      .catch((error) => {
          setLoading(false);
          console.error(error);
      });
    } catch (error) { 
        setLoading(false);
        console.error('catch error', error);
    } 
  }

  return (
    <View style={styles.container}> 
      <StatusBar style="auto" />
        <View style={styles.form}>
          <Text>LOGO HERE</Text>
          <Text style={{ color: 'red', fontFamily: 'Raleway-Bold', }}>{registerError}</Text>
          <Animatable.View  animation='slideInUp' style={styles.formContainer}>
            <Animatable.View style={styles.formGroup}>
              <TextInput 
                    placeholder={'Email address'}
                    style={styles.inputBox} 
                    onChangeText={(value) => setUserData({...userData, email: value})}
                />
            </Animatable.View>
            <TouchableOpacity onPress={() => navigation.navigate('Reset') }>
              <Text style={styles.forgetPasswordText}>Forget Password?</Text>            
            </TouchableOpacity>
            <Animatable.View style={styles.formGroup}>
              <TextInput 
                    placeholder={'Password'}
                    style={styles.inputBox}
                    secureTextEntry={true}
                    onChangeText={(value) => setUserData({...userData, password: value})}
                />
            </Animatable.View>
            <Text style={styles.tCText}>By loggin in, you agress to Nike's Privacy Policy and Terms of use</Text>
            <TouchableOpacity onPress={() => handleIncrement()} style={styles.button}>
              <Text style={styles.buttonText}>{ loading ? <ActivityIndicator color="#FFF" size="small" /> : 'Sign In' }</Text>             
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register') }>
                <Text  style={{ fontSize: 14, textAlign: 'center', color: 'rgba(0,0,0,0.7)', fontFamily: 'Raleway-Regular', }} >New here? <Text style={{  fontWeight: 'bold', textDecorationLine: 'underline', color: '#000' }}>Join US</Text></Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  form:{ 
    marginTop: 100,
    width,
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
    height: 50,
    borderColor: 'rgba(0,0,0,0.9)',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    justifyContent: 'center',
  },
  inputBox:{
    width: '100%', 
    color: '#000', 
    fontFamily: 'Raleway-Regular'
  },
  button:{
    width: '100%', 
    height: 50,
    backgroundColor: 'rgba(0,0,0, .9)',
    borderWidth: 1,
    borderRadius: 5, 
    marginVertical: 10, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText:{
    color: '#FFF',
    fontFamily: 'Raleway-Regular',
    fontSize: 18,
    textTransform: 'uppercase'
  },
  forgetPasswordText:{
    textAlign: 'right',
    fontSize: 12,
    marginTop: 10,
    color: 'rgba(0,0,0,0.7)',
    fontFamily: 'Raleway-Regular',
  },
  tCText:{
    marginVertical: 10,
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '100',
    fontFamily: 'Raleway-Regular',
  }
});
