import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView  } from 'react-native'; 
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

export default function ResetScreen({ navigation }) {
  return (
    <View style={styles.container}> 
      <StatusBar style="auto" />
        <Animatable.View animation='slideInUp' style={styles.form}>
          <Text>LOGO HERE</Text>
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <TextInput 
                    placeholder={'Email address'}
                    style={styles.inputBox}
                />
            </View> 
            <Text style={styles.tCText}>By loggin in, you agress to Nike's Privacy Policy and Terms of use</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Reset</Text>             
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
               <Text style={{ fontSize: 14, textAlign: 'center', color: 'rgba(0,0,0,0.7)', fontFamily: 'Raleway-Regular', }}><Text style={{  fontWeight: 'bold', textDecorationLine: 'underline', color: '#000' }}>Login</Text></Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
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
    marginVertical: 10,
    justifyContent: 'center',
  },
  inputBox:{
    width: '100%', 
    color: '#000',
    fontFamily: 'Raleway-Regular',
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
    fontSize: 18,
    textTransform: 'uppercase',
    fontFamily: 'Raleway-Regular',
  },
  forgetPasswordText:{
    textAlign: 'right',
    fontSize: 12,
    marginTop: 10,
    color: 'rgba(0,0,0,0.7)'
  },
  tCText:{
    marginVertical: 10,
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '100',
    fontFamily: 'Raleway-Regular',
  }
});
