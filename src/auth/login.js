import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView  } from 'react-native'; 
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({navigation}) {
  return (
    <View style={styles.container}> 
      <StatusBar style="auto" />
        <View style={styles.form}>
          <Text>LOGO HERE</Text>
          <Animatable.View  animation='slideInUp' style={styles.formContainer}>
            <Animatable.View style={styles.formGroup}>
              <TextInput 
                    placeholder={'Email address'}
                    style={styles.inputBox}
                />
            </Animatable.View>
            <TouchableOpacity onPress={() => navigation.navigate('Reset') }>
              <Text style={styles.forgetPasswordText}>Forget Password?</Text>            
            </TouchableOpacity>
            <Animatable.View style={styles.formGroup}>
              <TextInput 
                    placeholder={'Password'}
                    style={styles.inputBox}
                />
            </Animatable.View>
            <Text style={styles.tCText}>By loggin in, you agress to Nike's Privacy Policy and Terms of use</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'Dashboard' }) } style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>             
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
