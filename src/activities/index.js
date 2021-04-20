// import React, { Component } from 'react';
// import { View, StyleSheet, Text } from 'react-native';

// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// const Tab = createMaterialTopTabNavigator();

// import HistoryScreen from './history'; 
// import AchievementsScreen from './achivments';

// import MyTopTabBar from '../navigations/MyTopTabBar';

// export default function ActivityTab() {
//   return (
//     <Tab.Navigator tabBar={props => <MyTopTabBar {...props} /> }> 
//       <Tab.Screen name="History" component={HistoryScreen} /> 
//       {/* <Tab.Screen name="Achievements" component={AchievementsScreen} />  */}
//     </Tab.Navigator>
//   );
// }

import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, TouchableOpacity, TextInput, Pressable, ActivityIndicator, Modal } from 'react-native'; 
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SnackBar from 'rn-snackbar'
import SwitchSelector from "react-native-switch-selector";
 
const effortOptions = [ 
    { label: "Very Light", value: "Very Light" },
    { label: "Moderate", value: "Moderate" }, 
    { label: "Hard", value: "Hard" }, 
  ];
const locationOptions = [
    { label: "Gym", value: "Gym" },
    { label: "Home", value: "Home" },
    { label: "Outside", value: "Outside" } ,
  ];

const { width, height } = Dimensions.get('window');

export default function HistoryScreen ({ navigation }){
    const [ token, setToken ] = useState('');
    const [ userDetails, setUserDetails ] = useState({});  
    const [ savedWorkouts, setSavedWorkouts ] = useState({});  
    const [ loading, setLoading ] = useState(true);
    const [ finishedWorkOut, setfinishedWorkOut ] = React.useState(false);
    const [ currentWorkout, setCurrentWorkout ] = React.useState({});
    // console.log('log', subCategories)
    useEffect(() => {
        setCurrentWorkout({});
        setfinishedWorkOut(false);
        setLoading(true);  
        getUserDetails(); 
    },[])

    const getUserDetails = async () => {
        var token = await AsyncStorage.getItem('token');
        var userDetails = await AsyncStorage.getItem('userDetails'); 
        if(token !== null && userDetails !== null){ 
            setToken(JSON.parse(token));  
            setUserDetails(JSON.parse(userDetails));
            hardRefresh(JSON.parse(token));  
            return true;
        }else{
            navigation.navigate('Login');
        }  
        return false
    } 

    const hardRefresh = async (tokenId) => { 
        setLoading(true);  
        await fetch(`https://quantumleaptech.org/getFit/api/v1/user_workout/1`,{
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
                console.log(json);
                setLoading(false); 
                if(json.status === true && json.data.length > 0){   
                    SnackBar.show('Fetched successfully', { duration: 4000 })  
                    setSavedWorkouts(json.data);  
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
                <Text style={styles.counth1}>{savedWorkouts.length}</Text>
                <Text style={styles.headerTitle}>Total Work outs</Text>
                {/* <Text style={styles.counth2}>20</Text>
                <Text style={styles.headerTitle}>Total Minutes</Text> */}
            </View>
            <View style={styles.body}>
                <View style={styles.card}> 
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderText}>Your Activities</Text> 
                    </View> 
                </View>  
                <ScrollView style={{ height: height + 1000}} showsVerticalScrollIndicator={false} horizontal={false}> 
                                  
                    {  
                        savedWorkouts != null ?
                            Object.keys(savedWorkouts).map((key, index)=>{ console.log(savedWorkouts[key]) 
                                return (                           
                                <Pressable key={index} onPress={ async () => {setCurrentWorkout(savedWorkouts[key]); setfinishedWorkOut(true) }} 
                                    style={styles.listCon}> 
                                    <View style={styles.listConLeft}> 
                                        <ImageBackground 
                                            style={{ width: '100%', height: '100%', zIndex: -1 }} 
                                            source={{ uri: 'https://quantumleaptech.org/getFit'+savedWorkouts[key].workouts_details.image }}>
                                            <View style={styles.imageOverlay}>
                                                <Text style={styles.imageOverlayText}>{savedWorkouts[key].workouts_details.avg_min}</Text>
                                                {/* <Text style={styles.imageOverlayText}>Min</Text> */}
                                            </View>
                                        </ImageBackground>
                                    </View>
                                    <View style={styles.listConRight}>
                                        <Text style={styles.listConRightH1}>{savedWorkouts[key].workouts_details.name}</Text>
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
            
            <Modal
                    animationType="slide"
                    transparent={true}
                    visible={finishedWorkOut} 
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>   
                        <View style={{ alignItems: 'flex-start', width, paddingLeft: 20, bottom: 20 }}>
                            <Icon name="return-up-back-outline" size={30} color="#FFF" onPress={() => setfinishedWorkOut(false)} />
                        </View>
                        {
                            currentWorkout.workouts_details &&
                            <ImageBackground
                                    resizeMode="cover"
                                    source={{ uri: 'https://quantumleaptech.org/getFit'+currentWorkout.workouts_details.image }} 
                                    style={[styles.bgImage, {height: '50%'}]}>
                                    <View style={styles.overlay2}>
                                        <View style={styles.title}>
                                            <Text style={[styles.titleText, { color: '#fff', fontSize: 25, } ]}>{currentWorkout.workouts_details.name}</Text>
                                        </View> 
                                    </View>
                            </ImageBackground> 
                        }
                        <View style={styles.activityCon}>
                            <View style={{ flexDirection: 'row', padding: 20,borderBottomWidth: .5, borderColor: '#000' }}>
                                <View style={{ alignItems: 'center', width: '50%' }}>
                                    <Text style={{ fontFamily: 'Raleway-Regular', top: 5 }}>{currentWorkout.duration}</Text>
                                    <Text style={{ fontFamily: 'Raleway-Regular', top: 5 }}>Duration</Text>
                                </View>
                                <View style={{ alignItems: 'center', width: '50%' }}>
                                    <Text style={{ fontFamily: 'Raleway-Regular', top: 5 }}>{currentWorkout.calories}</Text>
                                    <Text style={{ fontFamily: 'Raleway-Regular', top: 5 }}>Approx. Calories</Text>
                                </View>
                            </View>
                            <View style={{ padding: 20, }}>
                                <View style={{  width: '100%'}}>
                                    <Text style={{ textAlign: 'left',   fontSize: 15,  fontFamily: 'Raleway-Regular', }}>Efforts</Text>
                                    <SwitchSelector
                                        options={effortOptions}
                                        initial={0}
                                        fontSize={14}  
                                        textColor={'#000'}  
                                        selectedColor={'#fff'}
                                        buttonColor={'#000'}
                                        borderColor={'#000'}
                                        hasPadding
                                        // onPress={value =>  setEffort(value) }
                                    />
                                </View>
                                <View style={{ width: '100%'}}>
                                    <Text style={{ textAlign: 'left', marginTop: 10, fontSize: 15,  fontFamily: 'Raleway-Regular', }}>Location</Text>
                                    <SwitchSelector
                                        options={locationOptions}
                                        initial={0}
                                        fontSize={14}
                                        textColor={'#000'}  
                                        selectedColor={'#fff'}
                                        buttonColor={'#000'}
                                        borderColor={'#000'}
                                        hasPadding
                                        // onPress={value => setLocation(value) }
                                    />
                                </View>
                                 
                                <View animation="slideInDown" easing={'linear'}  style={{ width: '100%', marginTop: 10 }}> 
                                    <TouchableOpacity style={[styles.cardBTNControl, { width: '100%' }]}  onPress={() => {navigation.navigate('previewVideo', {
                                                                                                                        items: currentWorkout
                                                                                                                    }); setfinishedWorkOut(false)} } >
                                        <Text style={{ color: '#FFF', fontFamily: 'Raleway-Bold', }}>Watch again</Text>
                                    </TouchableOpacity> 
                                </View> 
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>  
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
    },
    
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center", 
    },
    modalView: {
        width,
        height,
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }, 
    bgImage:{
        width,
        height,
        justifyContent: 'center'
    },
    overlay:{
        flex: 1,
        justifyContent: 'flex-end', 
    }, 
    overlay2:{
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    controlsContainer:{
        width,
        height: 100,
        alignItems: 'center', 
        marginBottom: "70%" 
    },
    controlsContainerHead:{
        width,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 40
    },
    cardCon:{ 
        // width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    limitter:{ 
        color: '#FFF',
        opacity: 100,
        fontFamily: 'Raleway-Regular',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoH1:{
        color: '#FFF',
        fontFamily: 'Raleway-Bold',
    },
    infoH2:{
        color: '#FFF',
        opacity: 100,
        fontFamily: 'Raleway-Medium',
    },
    cardConControl:{ 
        width: 50,
        height: 50,
        borderWidth: .3,
        borderColor: '#fff',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardBTNControl:{ 
        width: '70%',
        height: 50,
        borderWidth: .3,
        backgroundColor: '#000',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    activityCon:{
        width,
        height: 400,
        backgroundColor: '#FFF',
    }
})