import { StatusBar } from 'expo-status-bar';
import React, { Component, useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native'; 
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Video, AVPlaybackStatus } from 'expo-av';
import { List } from 'react-native-paper';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Asset, useAssets } from 'expo-asset'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import SnackBar from 'rn-snackbar'
import * as Speech from 'expo-speech';

function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}
const speach = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin  
                generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. 
                It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which 
                looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`;

const { width, height } = Dimensions.get('window')

export default function workOutVideoScreen ({route, navigation}){ 
    const { videos } = route.params; 
    const [ token, setToken ] = useState('');
    const [ userDetails, setUserDetails ] = useState({}); 
    const [ useMUsic, setUseMusic ] = useState(true);
    const [ pauseVideo, setPauseVideo ] = useState(false);
    const [ durationSec, setDurationSec ] = useState('');
    const [ isReady, setIsReady ]= useState(true);
    const [ videoIndex, setvideoIndex ] = useState(0);
    const [ currentVideo, setCurrentVideo ] = useState(videos.videos[videoIndex].url);
    const video = useRef();  
    const myVideos = [];
    videos.videos.forEach((element, index) => {
        myVideos[index] = 'https://quantumleaptech.org/getFit'+element.url;
    });

    const [assets] = useAssets(myVideos);

    // console.log(myVideos);
    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            // if (!hasUnsavedChanges) {
            //   // If we don't have unsaved changes, then we don't need to do anything
            //   return;
            // }
    
            // Prevent default behavior of leaving the screen
            e.preventDefault();
    
            // Prompt the user before leaving the screen
            Alert.alert(
              'Leave Workout?',
              'Are you sure to discard them and leave?',
              [
                { text: "Don't leave", style: 'cancel', onPress: () => {} },
                {
                  text: 'Discard',
                  style: 'destructive',
                  // If the user confirmed, then we dispatch the action we blocked earlier
                  // This will continue the action that had triggered the removal of the screen
                  onPress: () => { Speech.isSpeakingAsync() ? Speech.stop() : null; navigation.dispatch(e.data.action)}
                },
              ]
            );
          }),
        getUserDetails(); 
    }, [])
  
    const getUserDetails = async () => {
        setIsReady(false);  
        setPauseVideo(false)
        var token = await AsyncStorage.getItem('token');
        var userDetails = await AsyncStorage.getItem('userDetails');  
        if(token !== null && userDetails !== null){ 
            setToken(JSON.parse(token));  
            setUserDetails(JSON.parse(userDetails));                
            const playMusicValue = await AsyncStorage.getItem('playMusic');  
            if(playMusicValue != null){ 
                updateCurrentVideo(JSON.parse(playMusicValue).playMusic);
            } else{
                updateCurrentVideo(false);
            } 
        }else{
            navigation.navigate('Login');
        }  
        return false;
    }  

    const updateCurrentVideo = async (canPlayMusic) => { 
        console.log(canPlayMusic)
        setUseMusic(canPlayMusic); 
        if(canPlayMusic == false){
            console.log('why using me', useMUsic)
            Speech.speak(speach); 
        }
        setIsReady(true); 
        return true;
    }

    const millisToMinutesAndSeconds = async (data) => {        
        if(data.didJustFinish == true){ 
            await updateVideoLIst(videoIndex);
            setvideoIndex(videoIndex + 1); 
            setDurationSec(0);
        } 
        
        await video.current.getStatusAsync()
            .then(function(result) { 
                // console.log(result);
                if(result.durationMillis && result.positionMillis){   
                    var millis = result.positionMillis;
                    var minutes = Math.floor(millis / 60000);
                    var seconds = ((millis % 60000) / 1000).toFixed(0);
                    // console.log(minutes + ":" + (seconds < 10 ? '0' : '') + seconds);
                    setDurationSec(minutes + ":" + (seconds < 10 ? '0' : '') + seconds);
                }
            })
            .catch(failureCallback => console.log(failureCallback)); 
    } 

    const updatePauseVideo = async (value) => {
        setPauseVideo(value); 
        if(useMUsic == false){
            value == true ? 
                Speech.pause()
            :
                Speech.resume()
            ;
        }
    }

    const updateVideoLIst = async (current ) =>{  
        if(!(useMUsic)){
            console.log('why using me nowwww', useMUsic)
            Speech.speak(speach); 
        }
        return current != videos.videos.length ? setCurrentVideo(videos.videos[videoIndex + 1].url) : null;
    }

    if (!assets) {
        return (
          <View style={styles.loadingCotainer}>
              <ActivityIndicator color="#000" size="large" />
          </View>
        );
    }
 
    return(
        <View style={styles.container}>
             <StatusBar style="dark" />
             <View style={styles.videoPriview}>
                <View style={styles.control}>
                    <Text style={styles.durationVideo}>{ durationSec }</Text>
                    <Icon name={ pauseVideo ? 'ios-play-outline' : 'ios-pause-outline'} size={28} color="#FFF" onPress={() => updatePauseVideo(pauseVideo == true ? false : true) } />
                </View>
                <Video
                    ref={video}
                    style={styles.video}
                    source={{
                        uri: 'https://quantumleaptech.org/getFit'+currentVideo
                    }}
                    useNativeControls={false}
                    resizeMode={Video.RESIZE_MODE_COVER}
                    isLoopin={false} 
                    usePoster={true}
                    shouldPlay={!pauseVideo}
                    isMuted={!useMUsic}
                    onPlaybackStatusUpdate={status => millisToMinutesAndSeconds(status) }
                />
             </View>
             <View style={{ width, padding: 10, justifyContent: 'center' }}>
                 <Text style={{ color: 'grey', fontSize: 16, fontFamily: 'Raleway-SemiBold' }}>Mobility</Text>
             </View>
             <View style={styles.videoListCon}>
                 {
                     videos.videos != null &&
                     videos.videos.map((item, index) => (
                        <TouchableOpacity easing={'linear'} onPress={() => { setDurationSec(0); setCurrentVideo(item.url) }} style={styles.videoList} key={index}>
                            <Animatable.View animation="slideInRight" style={styles.durationCon}>
                                <Text style={styles.duration}>{ item.duration }</Text>
                            </Animatable.View>
                            <Animatable.View animation="slideInRight" style={styles.titleCon}> 
                                <Text style={styles.title}>{ item.name }</Text>
                            </Animatable.View>
                        </TouchableOpacity>
                     ))
                 } 
             </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingCotainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container:{
        marginTop: 30,
        flex: 1,
    }, 
    videoPriview:{
        width, 
        backgroundColor: 'rgba(0,0,0,0.1)', 
        zIndex: -1,
        // margin: 0,
        // height: 0,
    },
    video:{ 
        width: '100%', 
        height: 220,
        zIndex: 1
    },
    control:{
        width,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        zIndex: 10
    },
    durationVideo:{
        color: "#FFF",
        fontSize: 20,
        fontFamily: 'Raleway-Bold',
    },
    videoListCon:{ 
        width, 
        backgroundColor: 'rgba(0,0,0,0.02)', 
        zIndex: -1,
    },
    videoList:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: .2,
        borderColor: 'grey',
        marginVertical: 0
    },
    durationCon:{ 
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    duration:{
        color: '#000',
        fontFamily: 'Raleway-Bold',
        fontSize: 15
    },
    titleCon:{ 
        width: '80%',
        justifyContent: 'center',
        // alignItems: 'center',
    },
    title:{
        color: '#000',
        fontFamily: 'Raleway-Bold',
        fontSize: 15
    }
});