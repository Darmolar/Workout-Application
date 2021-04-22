import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView , TextInput, ImageBackground, ActivityIndicator, SafeAreaView } from 'react-native'; 
import * as Animatable from 'react-native-animatable';
// import {  } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SnackBar from 'rn-snackbar'
 

const { width, height } = Dimensions.get('window');
 
export default function subCollectionsScreen ({route, navigation}){ 
    const { item } = route.params;
    const [ token, setToken ] = useState('');
    const [ userDetails, setUserDetails ] = useState({}); 
    const [ subCategoryData, SetSubCategoryData ]  = useState(item)
    const [ loading, setLoading ] = useState(false);
    const [ totalWorkOuts, setTotalWorkOuts ] = useState(0);
    // console.log('log', item)
    useEffect(() => {
       getUserDetails(); 
    },[])

    const getUserDetails = async () => {
        var token = await AsyncStorage.getItem('token');
        var userDetails = await AsyncStorage.getItem('userDetails');
        // console.log(token);
        if(token !== null && userDetails !== null){ 
            setToken(JSON.parse(token)); 
            hardRefresh(JSON.parse(token));
            setUserDetails(JSON.parse(userDetails)) 
            return true;
        }else{
            navigation.navigate('Login');
        }  
        return false
    } 

    const hardRefresh = async (tokenId) => { 
        setLoading(true);  
        await fetch(`https://quantumleaptech.org/getFit/api/v1/collection/workout/${subCategoryData.id}`,{
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
                if(json.status === true && json.data.data.length > 0){  
                    // console.log(json.data);
                    SnackBar.show('Fetched successfully', { duration: 1000 })  
                    SetSubCategoryData({ ...subCategoryData, subCategory: json.data.data }); 
                    setLoading(false);
                    return true;
                }else{ 
                    setLoading(false);
                    SnackBar.show(json.message, { duration: 1000  })  
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
        <View style={ styles.conatiner } showsVerticalScrollIndicator={false} horizontal={false}> 
            <View style={styles.header}>
                <ImageBackground source={{ uri: 'https://quantumleaptech.org/getFit'+subCategoryData.image }} style={{ flex: 1, resizeMode: 'cover' }}> 
                    <View style={styles.headerContainer}>
                        <Icon name="ios-return-up-back" size={30} color="black" onPress={() => navigation.goBack()} /> 
                    </View>
                </ImageBackground>
            </View>  
            {/* <View style={styles.body}>           */}
                <ScrollView  contentContainerStyle={{ flexGrow: 1 }} style={styles.body} showsVerticalScrollIndicator={false} horizontal={false}>      
                    <View style={styles.bodyHeader}>
                        <Text style={styles.bodyHeaderText}>{subCategoryData.name}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10, }}>
                            {/* <Text style={{ color: 'grey', fontSize: 14, fontFamily: 'Raleway-Medium' }}>{totalWorkOuts} Workouts</Text> */}
                            <Text style={{ color: 'grey', fontSize: 14, fontFamily: 'Raleway-Medium', left: 10 }}>{ subCategoryData.level }</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 20, }}>
                        <Text style={{ color: '#000', fontSize: 12, fontFamily: 'Raleway-Medium', textAlign: 'left' }}>{subCategoryData.description}</Text>
                    </View>

                    {
                        subCategoryData.subCategory &&  
                        subCategoryData.subCategory.map((item, index) => {
                            return( 
                                 <View style={{ marginTop: 20, }} key={index}>
                                    <Text style={styles.listConHeaderText}>{item.name}</Text> 
                                    {
                                        item.workouts_details.length > 0 &&
                                        item.workouts_details.map(( item2, index2 ) => { 
                                            return ( 
                                                <TouchableOpacity key={index2} onPress={() => navigation.navigate('previewVideo', {
                                                    items: item2.work_out
                                                }) } style={styles.listCon}>
                                                    <View style={styles.listConLeft}>
                                                        <ImageBackground style={{ width: '100%', height: '100%', zIndex: -1 }} 
                                                        source={{ uri: 'https://quantumleaptech.org/getFit'+item2.work_out.image }}>
                                                            <View style={styles.imageOverlay}>
                                                                <Text style={styles.imageOverlayText}>{ item2.work_out.avg_min }</Text> 
                                                            </View>
                                                        </ImageBackground>
                                                    </View>
                                                    <View style={styles.listConRight}>
                                                        <Text style={styles.listConRightH1}>{ item2.work_out.name } </Text>
                                                        <Text style={styles.listConRightH2}>{ item2.work_out.intensity }  { item2.work_out.equipment }  { item2.work_out.level } </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }             
                                </View>
                            )
                        })
                    }
                </ScrollView> 
            {/* </View> */}
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
    }, 
    header:{
        width,
        height: 300, 
        borderWidth: .1,
        elevation: 1
    },
    headerContainer:{
        flexDirection: 'row',
        marginTop: 30,
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
        // height: 10000,
        padding: 20,
        marginBottom: '10%',
    },
    bodyHeader:{

    },
    bodyHeaderText:{
        fontSize: 25,
        color: '#000',
        fontFamily: 'Raleway-Bold',
    },
    listConHeaderText:{ 
        color: '#000',
        fontFamily: 'Raleway-Bold',
        textTransform: 'capitalize',
        fontSize: 18, 
    },
    listCon:{        
        width: '100%',
        // padding: 10,
        height: 100,
        flexDirection: 'row', 
        marginVertical: 5,
    },
    listConLeft:{
        width: '30%',
        height: '90%', 
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
        // justifyContent: 'space-evenly',
        padding: 10,
    },
    listConRightH1:{
        color: '#000',
        fontFamily: 'Raleway-SemiBold',
        textTransform: 'capitalize',
        fontSize: 18,
    },
    listConRightH2:{ 
        top: 5,
        color: '#000',
        opacity: 100,
        fontSize: 14,
        fontFamily: 'Raleway-Regular',
        textTransform: 'capitalize'
    }
})