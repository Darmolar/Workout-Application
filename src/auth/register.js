import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, ActivityIndicator  } from 'react-native'; 
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen({navigation}) { 
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [ loading, setLoading] = useState(false);
  const [ userData, setUserData ] = useState({
                                              dob: '',                                        
                                          });
  const [ registerError, setregisterError ] = useState('');

  const onChange = async (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    var d = new Date(currentDate);
    var DOB = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate();
    await setUserData({...userData, dob: DOB}) 
  };

  const handleRegistration = async () => { 
      try { 
        setLoading(true);
        fetch(`https://quantumleaptech.org/getFit/api/v1/register`, {
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
                console.log(json)
                if(json.status === true){ 
                    await AsyncStorage.setItem('userDetails', JSON.stringify(json.data.user_details))
                    await AsyncStorage.setItem('token', JSON.stringify(json.data.token))
                    navigation.navigate('Home', { screen: 'Dashboard' })  
                }else{  
                    for (const property in json.errors) { 
                        setregisterError(json.errors[property][0]); 
                        return false;
                    }
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
          <Text style={{ fontFamily: 'Raleway-Regular',  }} >Create your membership profile</Text>
          <Text style={{ color: 'red', fontFamily: 'Raleway-Bold', }}>{registerError}</Text>
          <Animatable.View animation='slideInUp'  style={styles.formContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.formGroup}>
                <TextInput 
                      placeholder={'Email address'}
                      style={styles.inputBox}
                      onChangeText={(value) => setUserData({...userData, email: value})}
                  />
              </View> 
              <View style={styles.formGroup}>
                <TextInput 
                      placeholder={'Password'}
                      style={styles.inputBox}
                      secureTextEntry={true}
                      onChangeText={(value) => setUserData({...userData, password: value})}
                  />
              </View>
              <View style={styles.formGroup}>
                <TextInput 
                      placeholder={'First Name'}
                      style={styles.inputBox}
                      onChangeText={(value) => setUserData({...userData, first_name: value})}
                  />
              </View>
              <View style={styles.formGroup}>
                <TextInput 
                      placeholder={'Last Name'}
                      style={styles.inputBox}
                      onChangeText={(value) => setUserData({...userData, last_name: value})}
                  />
              </View>
              <View style={styles.formGroup}>
                <TouchableOpacity onPress={() => setShow(true) }>
                  <Text 
                        placeholder={'DOB'}
                        style={styles.inputBox}  
                    >{userData.dob == '' ? 'DOB' : userData.dob }</Text>
                </TouchableOpacity>
                  {
                    show && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={date}
                          mode={'date'} 
                          display="calendar"
                          onChange={onChange}
                        />
                    )
                  }
              </View>
              <View style={styles.formGroup}>
                <TextInput 
                      placeholder={'Country'}
                      style={styles.inputBox}
                      onChangeText={(value) => setUserData({...userData, country: value})}
                  /> 
              </View>
              <Text style={styles.tCText}>By creating account, you agress to Nike's Privacy Policy and Terms of use</Text>
              <TouchableOpacity onPress={() => handleRegistration() } style={styles.button}>
                <Text style={styles.buttonText}> { loading ? <ActivityIndicator color="#FFF" size="small" /> : 'Sign Up' } </Text>             
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Login') }>
                <Text  style={{ fontSize: 14, textAlign: 'center', color: 'rgba(0,0,0,0.7)', fontFamily: 'Raleway-Regular', }} ><Text style={{  fontWeight: 'bold', textDecorationLine: 'underline', color: '#000' }}>Login to your account</Text></Text>
              </TouchableOpacity> 
            </ScrollView>
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
    borderWidth: .7,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
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
