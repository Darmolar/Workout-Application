import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ImageBackground, ActivityIndicator, SafeAreaView } from 'react-native'; 
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SnackBar from 'rn-snackbar'
 

const { width, height } = Dimensions.get('window');
 
export default function subSearchCategoryScreen ({route, navigation}){ 
    const { subCategories } = route.params;
    const [ token, setToken ] = useState('');
    const [ userDetails, setUserDetails ] = useState({}); 
    const [ subCats, setSubCats ] = useState(subCategories.sub_category);
    const [ loading, setLoading ] = useState(false);
    const [ currentVideoList, setcurrentVideoList ] = useState([]);
    // console.log('log', subCategories)
    useEffect(() => {
       getUserDetails(); 
    },[])

    const getUserDetails = async () => {
        var token = await AsyncStorage.getItem('token');
        var userDetails = await AsyncStorage.getItem('userDetails');
        // console.log(token);
        if(token !== null && userDetails !== null){
            // console.log(token); 
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
        await fetch(`https://quantumleaptech.org/getFit/api/v1/category/workout/${subCategories.id}`,{
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
                console.log(json.data);
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

const setCurrentViews = async (item) =>{
    console.log('currenView', item)
    setcurrentVideoList(item.workouts_details)
}

    if(loading == true){
        return (
            <View style={styles.appLoading}>
                <ActivityIndicator color="#000" size="large" />
            </View>
        )
    }
    
    return (
        <SafeAreaView style={ styles.conatiner }> 
                <View style={styles.header}>
                <View style={styles.headerContainer}>
                    <Icon name="ios-return-up-back" size={30} color="black" onPress={() => navigation.goBack()} />
                    <Text style={styles.headerText}>Browse By</Text>
                </View>
            </View>
            <View style={styles.middle}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        subCats.length > 0 &&
                        subCats.map((item, index) => {                            
                            return (
                                <TouchableOpacity onPress={() => setCurrentViews(subCats[index])} key={index} style={styles.middleButton}>
                                    <Text style={styles.middleButtonText}>{ item.name }</Text>
                                </TouchableOpacity>
                            )
                        })
                    } 
                </ScrollView>
            </View>
            <View style={styles.body}>
                <ScrollView style={{ padding: 10,height: height + 1000}} showsVerticalScrollIndicator={false} horizontal={false}>   
                    <Text style={{marginVertical: 5, color: 'grey', fontSize: 14, fontFamily: 'Raleway-Regular' }}>{currentVideoList.length} Workout</Text>                                    
                    {
                        currentVideoList != null &&
                        currentVideoList.map(( item, index ) => {
                           return (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('previewVideo', {
                                                items: item.work_out
                                            })} style={styles.listCon}>
                                <View style={styles.listConLeft}>
                                    <ImageBackground style={{ width: '100%', height: '100%', zIndex: -1 }} 
                                    source={{ uri: 'https://quantumleaptech.org/getFit'+item.work_out.image  }}>
                                        <View style={styles.imageOverlay}>
                                            <Text style={styles.imageOverlayText}>{ item.work_out.avg_min }</Text>
                                            {/* <Text style={styles.imageOverlayText}>Min</Text> */}
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.listConRight}>
                                    <Text style={styles.listConRightH1}>{ item.work_out.name } </Text>
                                    <Text style={styles.listConRightH2}>{ item.work_out.intensity }  { item.work_out.equipment }  { item.work_out.level }</Text>
                                </View>
                            </TouchableOpacity>
                           )
                        }) 
                    } 
                </ScrollView>
            </View>
        </SafeAreaView>
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
    middle:{
        width,
        height: 50, 
        backgroundColor: 'rgba(0,0,0,0.06)',
    },
    middleButton:{ 
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    middleButtonText:{ 
        fontSize: 17,
        fontFamily: 'Raleway-SemiBold',
        left: '5%',
        textTransform: 'capitalize'
    },
    body:{
        marginTop: 10
    },
    listCon:{        
        width: '100%',
        // padding: 10,
        height: 100,
        flexDirection: 'row', 
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
        padding: 10,
    },
    listConRightH1:{
        color: '#000',
        fontFamily: 'Raleway-SemiBold',
        textTransform: 'capitalize',
        fontSize: 20,
    },
    listConRightH2:{ 
        top: 10,
        color: '#000',
        opacity: 100,
        fontSize: 15,
        fontFamily: 'Raleway-Regular',
    }
})