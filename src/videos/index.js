import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import React, { Component, useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, TouchableOpacity, TextInput, ActivityIndicator, Platform  } from 'react-native'; 
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Video, AVPlaybackStatus } from 'expo-av';
import { List } from 'react-native-paper'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import SnackBar from 'rn-snackbar'  
import { Asset, useAssets } from 'expo-asset'; 
import * as FileSystem from 'expo-file-system'; 
const { StorageAccessFramework } = FileSystem;
const downloadedVideo = new Object;
const { width, height } = Dimensions.get('window');

export default function previewVideoScreen ({route, navigation}){ 
    const video = useRef(); 
    const { items } = route.params;
    const [ token, setToken ] = useState('');
    const [ userDetails, setUserDetails ] = useState({}); 
    const [ expanded, setExpanded]  = React.useState(true);
    const [ loading, setLoading ] = useState(true);
    const [ workOutSection, setWorkOutSection ] = useState(items);  
    const [ saved, setSaved ] = useState(false);
    const [ loadingWorkOuts, setLoadingWorkOuts ] = useState(false);
    // console.log(items);
    const gifDir = FileSystem.cacheDirectory + 'workouts/workouts_/storage/videos/'+items.id;
    const gifFileUri = (gifId) => { 
                                    let filename = gifId.url.substring(gifId.url.lastIndexOf('/') + 1, gifId.url.length);
                                    return (gifDir+ `${filename}`)
                                }; 
    const gifUrl = (gifId) => `https://quantumleaptech.org/getFit${gifId.url}`;
    useEffect(() => {
        getUserDetails();       
    }, [])
 
    // Checks if gif directory exists . If not, creates it
    const ensureDirExists = async () => {
        const dirInfo = await FileSystem.getInfoAsync(gifDir);
        if (!dirInfo.exists) {
            // console.log("Gif directory doesn't exist, creating...");
            await FileSystem.makeDirectoryAsync(gifDir, { intermediates: true });
        } 
    }

    const getUserDetails = async () => { 
        // await AsyncStorage.removeItem(`workOutVideo_${workOutSection.id}`);
        var token = await AsyncStorage.getItem('token');
        var userDetails = await AsyncStorage.getItem('userDetails'); 
        var savedWorkouts = await AsyncStorage.getItem('savedWorkouts');
        setWorkOutSection({ ...workOutSection, sections: null }); 
        if(token !== null && userDetails !== null){
            // console.log(token); 
            setToken(JSON.parse(token)); 
            hardRefresh(JSON.parse(token));
            setUserDetails(JSON.parse(userDetails)) 
            if(savedWorkouts !== null){
                var alreadySavedWorkOut = JSON.parse(savedWorkouts);
                var myId = workOutSection.id;
                if(alreadySavedWorkOut.myId){  
                    setSaved(true);
                }
            }
            return true;
        }else{
            navigation.navigate('Login');
        } 
        return false;
    } 

    const hardRefresh = async (tokenId) => { 
        setLoading(true);  
        await fetch(`https://quantumleaptech.org/getFit/api/v1/section/find/${workOutSection.id}`,{
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
                if(json.status === true && json.data.videos.length > 0){   
                    SnackBar.show('Fetched successfully', { duration: 2000 })  
                    await setWorkOutSection({ ...workOutSection, sections: json.data }); 
                    setLoading(false);
                    return true;
                }else{ 
                    setLoading(false);
                    SnackBar.show(json.message, { duration: 2000  })  
                }
            }) 
            .catch((error) => { 
                setLoading(false); 
            }); 
    }  

    const handlePress = () => setExpanded(!expanded);

    const cahceFIleBeforeRender = async () => { 
        try { 
            var videoCache = await AsyncStorage.getItem(`workOutVideo_${workOutSection.id}`);
            // console.log(videoCache) 
            if(videoCache == null ){
                setLoadingWorkOuts(true);
                await ensureDirExists(); 
                // console.log('Downloading', workOutSection.sections.videos.length, 'files...');
                await Promise.all(
                    workOutSection.sections.videos.map( (id, index) => 
                                                            FileSystem.downloadAsync(gifUrl(id), gifFileUri(id))
                                                                .then(({ uri }) => {
                                                                    workOutSection.sections.videos[index]['uri'] = uri;
                                                                    workOutSection.sections.videos[index]['confimed'] = false;                                                                     
                                                                })
                                                                .catch(error => { 
                                                                }) 
                                                            )                                                    
                                                        );
                var allData = workOutSection.sections; 
                await AsyncStorage.setItem(`workOutVideo_${workOutSection.id}`, JSON.stringify(allData) ); 
                setLoadingWorkOuts(false);
                navigation.navigate('workOutVideo', { workout: workOutSection, videos: allData, token: token, user: userDetails });
            }else{ 
                var allData = JSON.parse(videoCache);   
                navigation.navigate('workOutVideo', { workout: workOutSection, videos: allData, token: token, user: userDetails  });
            }  
        } catch (e) {
            // console.error("Couldn't download mp4 files:", e);
        }
        return false;
    } 

    const saveWorkOut = async (id) => {
        var savedWorkouts = await AsyncStorage.getItem('savedWorkouts');
        SnackBar.dismiss();
        if(savedWorkouts !== null){
            var alreadySavedWorkOut = JSON.parse(savedWorkouts);
            var myId = id.id
            if(alreadySavedWorkOut.myId){ 
                delete alreadySavedWorkOut.myId;
                setSaved(false);
                await AsyncStorage.setItem('savedWorkouts', JSON.stringify(alreadySavedWorkOut));
                SnackBar.show('Removed successfully', { duration: 1000 }) 
            }else{ 
                alreadySavedWorkOut.myId = id;
                setSaved(true);
                await AsyncStorage.setItem('savedWorkouts', JSON.stringify(alreadySavedWorkOut));
                SnackBar.show('Saved successfully', { duration: 1000 }) 
            }
        }else{
            var newSavedWorkOut = new Object();
            newSavedWorkOut[id.id] = id;
            setSaved(true);
            await AsyncStorage.setItem('savedWorkouts', JSON.stringify(newSavedWorkOut));
            SnackBar.show('Saved successfully', { duration: 1000 }) 
        }
        return true;
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
                    <View style={{ width: '70%', flexDirection: 'row' }} >
                        <Icon name="ios-return-up-back" size={30} color="black" onPress={() => navigation.goBack()} />
                        <Text style={styles.headerText}>Overview</Text>
                    </View>
                    <View style={{ width: '30%',  flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Icon name={saved == true ? "cloud-download" : "cloud-download-outline"} size={27} color="black"  onPress={() => saveWorkOut(workOutSection) } />
                        <Icon name="md-share-social-outline" size={27} color="black" />
                    </View>
                </View>
            </View>
            <View style={styles.body}>
                <ScrollView style={{ marginBottom: 70 }}>
                    <ImageBackground 
                        resizeMode="cover"
                        source={{ uri: 'https://quantumleaptech.org/getFit'+workOutSection.image }} 
                        style={styles.bgImage}> 
                        <View style={styles.overlay}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>{workOutSection.name}</Text>
                            </View>
                            <View style={styles.controlsContainer}>
                                <Animatable.View animation="slideInDown" easing={'linear'}   style={styles.controlsContainerHead}>
                                    <View style={styles.cardCon}>
                                        <Text style={styles.infoH1}>{workOutSection.avg_min}</Text>
                                        <Text style={styles.infoH2}>Avg. Minutes</Text>
                                    </View>
                                    <Text style={styles.limitter}>|</Text>
                                    <View style={styles.cardCon}>
                                        <Text style={styles.infoH1}>{workOutSection.intensity}</Text>
                                        <Text style={styles.infoH2}>Intensity</Text>
                                    </View>
                                    <Text style={styles.limitter}>|</Text>
                                    <View style={styles.cardCon}>
                                        <Text style={styles.infoH1}>{workOutSection.level}</Text>
                                        <Text style={styles.infoH2}>Level</Text>
                                    </View>
                                </Animatable.View>
                                <Animatable.View animation="slideInDown" easing={'linear'}  style={styles.controlsContainerHead}> 
                                    <TouchableOpacity style={styles.cardConControl}  onPress={() =>  navigation.navigate('workSettings') } >
                                        <Icon name="ios-settings-outline" size={24} color="#FFF" />
                                    </TouchableOpacity>
                                    <TouchableOpacity disabled={workOutSection.sections == null || workOutSection.sections.videos.length == 0 || loadingWorkOuts} onPress={() => cahceFIleBeforeRender() } style={[styles.cardConControl, { width: 100, height: 100, borderRadius: 100 }]}>                                        
                                        { 
                                            loadingWorkOuts == true ?  
                                            <Text style={{ color: '#FFF', fontFamily: 'Raleway-Bold', }}>Loading ...</Text>   : 
                                            <Icon name="ios-play-outline" size={50} color="#FFF" />                                             
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.cardConControl} onPress={() => navigation.navigate('musicSettings') } >
                                        <Icon name="ios-musical-notes-outline" size={24} color="#FFF" />
                                    </TouchableOpacity>
                                </Animatable.View> 
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={styles.middleCard}>
                        <Text style={styles.middleCardH1}>Good for</Text>
                        <Text  style={styles.middleCardH2}>{workOutSection.description}</Text>
                    </View>
                    <View style={styles.middleCard}>
                        <Text style={styles.middleCardH1}>Equipments</Text>
                        <Text  style={styles.middleCardH2}>{workOutSection.equipment}</Text>
                    </View>
                    <View style={styles.middleCardImage}>
                        <View style={[styles.imageOverlay, { flex: 1, padding: 40 } ]}>
                            <Text  style={styles.middleCardH2}>
                                <FontAwesome name="quote-left" size={20} color="#FFF" />
                            </Text>
                            <Text style={[styles.middleCardH1, { color: '#FFF', textAlign: 'center' }]}>Equipments</Text>
                            <Text  style={styles.middleCardH2}>
                                <FontAwesome name="quote-right" size={20} color="#FFF" />
                            </Text>
                        </View> 
                    </View>
                    <View style={styles.middleCard}>
                        <Text style={styles.middleCardH1}>Workout Created By</Text>
                        <Text  style={styles.middleCardH2}>Administrstor</Text>
                    </View>
                    <View style={styles.assementList}> 
                        {
                            workOutSection.sections ?
                                workOutSection.sections.videos.map((item, index) => {  
                                    return ( 
                                        <List.Section id={index} key={index}>
                                            <List.Accordion
                                                titleStyle={styles.imageOverlayText}
                                                title={item.name}
                                                left={props => <ImageBackground style={{ width: 70, height: 60, zIndex: -1 }} source={{ uri: 'https://quantumleaptech.org/getFit'+workOutSection.image }}>
                                                                    <View style={styles.imageOverlay}></View>
                                                                </ImageBackground>}
                                                            >
                                                <List.Item 
                                                        left={props => <Video
                                                                        ref={video}
                                                                        style={styles.videoPriview}
                                                                        source={{
                                                                            uri: 'https://quantumleaptech.org/getFit'+item.url,
                                                                        }}
                                                                        useNativeControls={false}
                                                                        resizeMode="cover"
                                                                        isLooping={false}
                                                                        usePoster={true}
                                                                        shouldPlay={true}
                                                                        isMuted={true}
                                                                        // onPlaybackStatusUpdate={status => setStatus(() => status)}
                                                                    />
                                                                }                                                                       
                                                        title={''} /> 
                                            </List.Accordion> 
                                        </List.Section> 
                                    );
                                })
                            : 
                            null
                        } 
                    </View>
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
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerText:{
        fontSize: 19,
        fontFamily: 'Raleway-Medium',
        left: 30, 
    },
    body:{
        width,
    },  
    bgImage:{
        width,
        height,
    },
    overlay:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    title:{
        width,
        alignItems: 'center',
        marginBottom: "40%" 
    },
    titleText:{
        color: '#FFF',
        fontSize: 30,
        fontFamily: 'Raleway-Bold',
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
        borderColor: '#FFF',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    list:{
        width,
    },
    listCon:{        
        width: '100%',
        padding: 0,
        height: 110,
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
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageOverlayText:{
        color: '#000',
        opacity: 100,
        fontSize: 16,
        fontFamily: 'Raleway-Regular',
    },  
    listConMiddle:{
        width: '55%',
        height: '100%',
        justifyContent: 'space-evenly',
        padding: 10,
    },
    listConRight:{ 
        width: '15%',
        height: '100%',
        justifyContent: 'space-evenly',
        padding: 10,
    },
    video:{
        width: '100%',
        height: '100%',
    }, 
    videoPriview:{
        width: width - 20, 
        height: 200,
        backgroundColor: 'rgba(0,0,0,0.2)', 
    },
    middleCard:{
        width,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: 'grey'
    },
    middleCardH1:{
        color: '#000',
        opacity: 100,
        fontSize: 14,
        fontFamily: 'Raleway-Medium',
    },
    middleCardH2:{
        color: '#000',
        opacity: 100,
        fontSize: 12,
        fontFamily: 'Raleway-Regular',
    },
    middleCardImage:{ 
        width,
        height: 300, 
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: 'grey'
    }
});