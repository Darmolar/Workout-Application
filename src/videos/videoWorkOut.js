import { StatusBar } from 'expo-status-bar';
import React, { Component, useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'; 
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


function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}
const { width, height } = Dimensions.get('window')
const videoFiles =  [
                        {
                            title: 'Pull Up',
                            duration: '4:00',
                            Videourl: 'http://techslides.com/demos/sample-videos/small.mp4',
                        }, 
                        {
                            title: 'Press Down',
                            duration: '1:00',
                            Videourl: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                        },
                    ];

export default function workOutVideoScreen ({route, navigation}){ 
    const { videos } = route.params; 
    const [ token, setToken ] = useState('');
    const [ userDetails, setUserDetails ] = useState({}); 
    const [ pauseVideo, setPauseVideo ] = useState(false);
    const [ durationSec, setDurationSec ] = useState('');
    const [ isReady, setIsReady ]= useState(false);
    const [ videoIndex, setvideoIndex ] = useState(0);
    const [ currentVideo, setCurrentVideo ] = useState(videos.videos[videoIndex].url);
    const video = useRef(); 
    
    const [assets] = useAssets([ 
                                'http://techslides.com/demos/sample-videos/small.mp4',                         
                            ]);

    useEffect(()=>{
        getUserDetails(); 
        setIsReady(false);
        // setCurrentVideo(); 
    }, [currentVideo])
  
    const getUserDetails = async () => {
         var token = await AsyncStorage.getItem('token');
         var userDetails = await AsyncStorage.getItem('userDetails');  
         if(token !== null && userDetails !== null){
             // console.log(token); 
             setToken(JSON.parse(token));  
             setUserDetails(JSON.parse(userDetails)) 
             return true;
         }else{
             navigation.navigate('Login');
         }  
         return false
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

    const updateVideoLIst = async (current, ) =>{ 
        console.log(videos.videos[videoIndex + 1].url)
        // const [assets] = useAssets([ 
        //     videos.videos[videoIndex + 1].url,                         
        // ]); 
        return current != videoFiles.length ? setCurrentVideo(videos.videos[videoIndex + 1].url) : null;
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
                    <Text style={styles.durationVideo}>{ durationSec} </Text>
                    <Icon name={ pauseVideo ? 'ios-play-outline' : 'ios-pause-outline'} size={28} color="#FFF" onPress={() => setPauseVideo(!pauseVideo)} />
                </View>
                <Video
                        ref={video}
                        style={styles.video}
                        source={{
                            uri: 'https://quantumleaptech.org/getFit'+currentVideo,
                        }}
                        useNativeControls={false}
                        resizeMode={Video.RESIZE_MODE_COVER}
                        isLoopin={false} 
                        usePoster={true}
                        shouldPlay={!pauseVideo}
                        isMuted={false}
                        onPlaybackStatusUpdate={status => millisToMinutesAndSeconds(status) }
                    />
             </View>
             <View style={{ width, padding: 10, justifyContent: 'center' }}>
                 <Text style={{ color: 'grey', fontSize: 16, fontFamily: 'Raleway-Regular' }}>Mobility</Text>
             </View>
             <View style={styles.videoListCon}>
                 {
                     videos.videos != null &&
                     videos.videos.map((item, index) => (
                        <TouchableOpacity easing={'linear'} onPress={() => { setDurationSec(0); setCurrentVideo(item.url) }} style={styles.videoList} key={index}>
                            <Animatable.View animation="slideInRight" style={styles.durationCon}>
                                <Text style={styles.duration}>{ item.duration }</Text>
                            </Animatable.View>
                            <Animatable.View  animation="slideInRight" style={styles.titleCon}> 
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