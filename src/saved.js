import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, TouchableOpacity, TextInput, Pressable, ActivityIndicator } from 'react-native'; 
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SnackBar from 'rn-snackbar'

const { width, height } = Dimensions.get('window');

export default function SavedScreen ({navigation}){  
    const [ token, setToken ] = useState('');
    const [ userDetails, setUserDetails ] = useState({});  
    const [ savedWorkouts, setSavedWorkouts ] = useState({});  
    const [ loading, setLoading ] = useState(false);
    // console.log('log', subCategories)
    useEffect(() => {
       setLoading(true);  
       getUserDetails(); 
    },[])

    const getUserDetails = async () => {
        var token = await AsyncStorage.getItem('token');
        var userDetails = await AsyncStorage.getItem('userDetails');
        var savedWorkouts = await AsyncStorage.getItem('savedWorkouts'); 
        if(token !== null && userDetails !== null){ 
            setToken(JSON.parse(token));  
            setUserDetails(JSON.parse(userDetails));
            if(savedWorkouts !== null){
                setSavedWorkouts(JSON.parse(savedWorkouts));
                setLoading(false);  
            } else{
                
                setLoading(false);  
            }
            return true;
        }else{
            navigation.navigate('Login');
        }  
        return false
    } 
    
    if(loading == true){
        return (
            <View style={styles.appLoading}>
                <ActivityIndicator color="#000" size="large" />
            </View>
        )
    }
    
    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContainer}>
                    <Icon name="ios-return-up-back" size={30} color="black" onPress={() => navigation.goBack()} />
                    <Text style={styles.headerText}>Saved Workouts</Text>
                </View>
            </View>
            <View style={styles.body}>
                <ScrollView style={styles.bodyListContainer}>
                    {/* {console.log(savedWorkouts)} */}
                    {  
                        savedWorkouts !== null ?
                            Object.keys(savedWorkouts).map((key, index)=>{  
                                return (                           
                                <Pressable key={index} onPress={() => navigation.navigate('previewVideo', {
                                                                        items: savedWorkouts[key]
                                                                    })
                                                                } 
                                    style={styles.listCon}> 
                                    <View style={styles.listConLeft}>
                                        <ImageBackground 
                                            style={{ width: '100%', height: '100%', zIndex: -1 }} 
                                            source={{ uri: 'https://quantumleaptech.org/getFit'+savedWorkouts[key].image }}>
                                            <View style={styles.imageOverlay}>
                                                <Text style={styles.imageOverlayText}>{savedWorkouts[key].avg_min}</Text>
                                                {/* <Text style={styles.imageOverlayText}>Min</Text> */}
                                            </View>
                                        </ImageBackground>
                                    </View>
                                    <View style={styles.listConRight}>
                                        <Text style={styles.listConRightH1}>{savedWorkouts[key].name}</Text>
                                        {/* <Text style={styles.listConRightH2}>Intermediate - Basic Equipments - Strength</Text> */}
                                    </View>
                                </Pressable> 
                                )}
                            ) 
                        :
                        <Text style={{ color: '#000' }}>No saved work out</Text>
                    }
                </ScrollView>
            </View>
        </View>
    ) 
}

const styles = StyleSheet.create({
    appLoading:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container:{
        flex: 1,
    },
    header:{
        width,
        height: 80,
        justifyContent: 'flex-end',
        borderWidth: .1,
        elevation: 1
    },
    headerContainer:{
        flexDirection: 'row',
        padding: 10,
        left: 10,
        alignItems: 'center'
    },
    headerText:{
        fontSize: 19,
        fontFamily: 'Raleway-Medium',
        left: 30, 
    },
    body:{
        width,
    }, 
    listCon:{        
        width: '100%',
        padding: 20,
        height: 130,
        flexDirection: 'row', 
    },
    listConLeft:{
        width: '30%',
        height: '100%', 
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageOverlay:{ 
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageOverlayText:{
        color: '#FFF',
        fontSize: 20,
        fontFamily: 'Raleway-Bold',
    },  
    listConRight:{ 
        width: '70%',
        height: '100%',
        justifyContent: 'space-evenly',
        padding: 10,
    },
    listConRightH1:{
        color: '#000',
        fontFamily: 'Raleway-Bold',
        textTransform: 'capitalize',
        fontSize: 20,
    },
    listConRightH2:{ 
        color: '#000',
        opacity: 100,
        fontSize: 15,
        fontFamily: 'Raleway-Regular',
    }
});