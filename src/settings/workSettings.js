import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import SnackBar from 'rn-snackbar'

const { width, height } = Dimensions.get('window');

export default function workSettingsScreen({ navigation }){
    const [ playMusic, setPlayMusic ] = useState(false);
    const [ drillTiming, setDrilTiming ] = useState(false);
    const [ token, setToken ] = useState('');
    const [ userDetails, setUserDetails ] = useState({});  
    const [ loading, setLoading ] = useState(false);  
 
    useEffect(() => {
       getUserDetails(); 
    },[])
 
    const getUserDetails = async () => {
        setLoading(true);
        var token = await AsyncStorage.getItem('token');
        var userDetails = await AsyncStorage.getItem('userDetails');
        if(token !== null && userDetails !== null){ 
            setToken(JSON.parse(token));  
            var data = JSON.parse(userDetails); 
            setUserDetails(data);
            setLoading(false);
            var playMusic = await AsyncStorage.getItem('playMusic'); 
            var playMusicValue = await AsyncStorage.getItem('drillTiming');
            if(playMusic != null){ 
                // console.log(playMusic);
                setPlayMusic(JSON.parse(playMusic).playMusic);
            }
            if(playMusicValue != null){ 
                setDrilTiming(JSON.parse(playMusicValue).drillTime);
            }
            return true;
        }else{
            navigation.navigate('Login');
        }  
        return false
    } 

    const updatePayMusic = async () =>{         
        try {      
            setPlayMusic(!playMusic);
            const playMusicValue = await AsyncStorage.getItem('playMusic');            
            const value = {
                playMusic: !playMusic
            } 
            if(playMusicValue !== null) {
                await AsyncStorage.removeItem('playMusic');
                await AsyncStorage.setItem('playMusic', JSON.stringify(value) );
            }else{
                await AsyncStorage.setItem('playMusic', JSON.stringify(value));
            }
        } catch(e) { 
            SnackBar.show(e, { duration: 4000 })  
        }
    }

    const updateDrillTiming = async () =>{         
        try {      
            setDrilTiming(!drillTiming) ;
            const playMusicValue = await AsyncStorage.getItem('drillTiming');            
            const value = {
                drillTime: !drillTiming
            } 
            if(playMusicValue !== null) {
                await AsyncStorage.removeItem('drillTiming');
                await AsyncStorage.setItem('drillTiming', JSON.stringify(value) );
            }else{
                await AsyncStorage.setItem('drillTiming', JSON.stringify(value));
            }
        } catch(e) { 
            SnackBar.show(e, { duration: 4000 })  
        }
    }
 
    if(loading == true){
        return (
            <View style={styles.appLoading}>
                <ActivityIndicator color="#000" size="large" />
            </View>
        )
    } 

    return( 
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContainer}>
                    <Icon name="ios-return-up-back" size={30} color="black" onPress={() => navigation.goBack()} />
                    <Text style={styles.headerText}>Workout Settings</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyListContainer}> 
                    <TouchableOpacity style={styles.listContainer}>
                        <Text style={styles.listContainerText}>Play Music when work out pauses</Text>
                        <Text style={[styles.listContainerText, { fontSize: 14 }]}> 
                            <Switch thumbColor="black" value={playMusic}  onChange={() =>  updatePayMusic()}  />
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.listContainerTab}>  
                    </View> 
                    <TouchableOpacity style={styles.listContainer}>
                        <Text style={styles.listContainerText}>Drill timing and guidiance</Text>  
                        <Text style={[styles.listContainerText, { fontSize: 14 }]}>
                            <Switch thumbColor="black" value={drillTiming}  onChange={() =>  updateDrillTiming()}  />
                        </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.listContainer}>
                        <Text style={styles.listContainerText}>Weight</Text> 
                        <Text style={[styles.listContainerText, { fontSize: 14 }]}>edit</Text>
                    </TouchableOpacity>  */}
                    <View style={{ padding: 20 }}> 
                       <TouchableOpacity style={styles.button}>
                           <Text style={styles.buttonText}>DELETE ALL WORK OUT</Text>
                       </TouchableOpacity>
                       <Text style={styles.feeText}>This will free up up to 100mb</Text>
                    </View> 
                </View>
            </View>
        </View>
    );
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
    listContainerTab:{
        width: '100%',
        minHeight: 40,
        borderWidth: .1,
        elevation: .3,
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    listContainerTabText:{
        fontSize: 16,
        opacity: 30,
        fontFamily: 'Raleway-Regular', 
    },
    listContainer:{
        width: '100%',
        height: 50,
        padding: 20,
        borderWidth: .1,
        elevation: .3,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    listContainerText:{
        fontSize: 16,
        fontFamily: 'Raleway-Regular', 
    },
    button:{
        width: '100%',
        alignSelf: 'center',
        height: 50,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        color: '#fff',
        fontFamily: 'Raleway-Bold', 
    },
    feeText:{
        marginVertical: 10,
        color: '#000',
        textAlign: 'center',
        opacity: 10,
        fontFamily: 'Raleway-Regular', 
    }
});