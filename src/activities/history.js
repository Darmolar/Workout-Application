import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, TouchableOpacity, TextInput, Pressable, ActivityIndicator } from 'react-native'; 
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SnackBar from 'rn-snackbar'
const { width, height } = Dimensions.get('window');

export default function HistoryScreen (){
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

    const hardRefresh = async (tokenId) => { 
        setLoading(true);  
        await fetch(`https://quantumleaptech.org/getFit/api/v1/category/workout/ `,{
                headers:{
                    Accept: 'application/json',
                    Authorization: `Bearer ${tokenId}` 
                }    
            })
            .then((response) => response.json())
            .then(async (json) => { 
                if(json.message == "Unauthenticated."){ 
                    await AsyncStorage.removeItem('token') 
                    await AsyncStorage.removeItem('userDetails') 
                        navigation.navigate('Login'); 
                }
                // console.log(json.data);
                setLoading(false); 
                if(json.status === true && json.data.data.length > 0){  
                    // console.log(json.data);
                    SnackBar.show('Fetched successfully', { duration: 4000 })  
                    setSubCats(json.data.data); 
                    setCurrentViews(json.data.data[0]);
                    setLoading(false);
                    return true;
                }else{ 
                    setLoading(false);
                    SnackBar.show(json.message, { duration: 4000  })  
                }
            }) 
            .catch((error) => { 
                setLoading(false);
                // console.error(error);
            }); 
    } 

    
    if(loading == true){
        return (
            <View style={styles.appLoading}>
                <ActivityIndicator color="#000" size="large" />
            </View>
        )
    }
    return (
        <View style={ styles.conatiner }> 
            <View style={styles.header}>
                <Text style={styles.counth1}>1</Text>
                <Text style={styles.headerTitle}>Total Work outs</Text>
                <Text style={styles.counth2}>20</Text>
                <Text style={styles.headerTitle}>Total Minutes</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.card}> 
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderText}>Your Activities</Text> 
                    </View> 
                </View>  
                <ScrollView style={{ height: height + 1000}} showsVerticalScrollIndicator={false} horizontal={false}>                        
                    {  
                        savedWorkouts !== null ?
                            Object.keys(savedWorkouts).map((key, index)=>{ console.log(savedWorkouts[key]) 
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
                        <Text>No saved work out</Text>
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
    conatiner:{
        flex: 1, 
        alignItems: 'center',
    },
    header:{
        width,
        height: 200,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    counth1:{ 
        fontSize: 70,
        fontFamily: 'Raleway-SemiBold', 
    },
    counth2:{
        fontSize: 30,
        fontFamily: 'Raleway-SemiBold', 
    },
    headerTitle:{
        fontSize: 15,
        textTransform: 'capitalize',
        color: 'grey',
    },
    body:{
        marginTop: 10
    },
    card:{ 
        width,
        height: 70, 
        marginVertical: 2, 
        backgroundColor: 'rgba(0,0,0,0.03)'
    },
    cardHeader:{ 
        height: 70, 
        justifyContent: 'center', 
    },
    cardHeaderText:{
        fontSize: 17,
        fontFamily: 'Raleway-SemiBold',
        left: '5%',
        textTransform: 'capitalize'
    },
    cardHeaderText2:{ 
        fontSize: 20,
        color: 'grey',
        fontFamily: 'Raleway-Bold',
        left: '5%',
        textTransform: 'capitalize'
    },
    cardBody:{
        height: 200,   
    },
    cardImage:{
        width: width / 2,
        flex: 1,
        alignItems: 'flex-end',  
        marginHorizontal: 3,
    },
    cardText:{
        width: 23,
        height: 23, 
        borderRadius: 20,
        backgroundColor: '#FFF',  
        right: '5%',
        top: '5%',
        justifyContent: 'center',
        alignItems: 'center'
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
        fontFamily: 'Raleway-SemiBold',
        textTransform: 'capitalize',
        fontSize: 20,
    },
    listConRightH2:{ 
        color: '#000',
        opacity: 100,
        fontSize: 15,
        fontFamily: 'Raleway-Regular',
    }
})