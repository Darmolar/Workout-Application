import { StatusBar } from 'expo-status-bar';
import React, { Component, useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, TouchableOpacity, TextInput } from 'react-native'; 
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Video, AVPlaybackStatus } from 'expo-av';
import { List } from 'react-native-paper'; 


const { width, height } = Dimensions.get('window');

export default function previewVideoScreen ({navigation}){ 
    const video = useRef(); 
    const [expanded, setExpanded] = React.useState(true);
    const [ workOutPriviews, setworkOutPriviews ] = useState([
                                                                {
                                                                    id: 1,
                                                                    title: "20 Push Ups",
                                                                    uri: 'https://media.self.com/photos/58d693e3d92aa7631e120f9d/4:3/w_2560%2Cc_limit/GettyImages-486273040.jpg',
                                                                    preview: false,
                                                                },
                                                                {
                                                                    id: 2,
                                                                    title: "20 Press Backs",
                                                                    uri: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                                                                    preview: false,
                                                                },
                                                                {
                                                                    id: 3,
                                                                    title: "20 Tommy Lifter",
                                                                    uri: 'https://media.self.com/photos/58d693e3d92aa7631e120f9d/4:3/w_2560%2Cc_limit/GettyImages-486273040.jpg',
                                                                    preview: false,
                                                                }
                                                            ]);

    useEffect(() => {
        // setworkOutPriviews( )
    }, [workOutPriviews]); 

    const handlePress = () => setExpanded(!expanded);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContainer}>
                    <View style={{ width: '70%', flexDirection: 'row' }} >
                        <Icon name="ios-return-up-back" size={30} color="black" onPress={() => navigation.goBack()} />
                        <Text style={styles.headerText}>Overview</Text>
                    </View>
                    <View style={{ width: '30%',  flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Icon name="cloud-download-outline" size={27} color="black" />
                        <Icon name="md-share-social-outline" size={27} color="black" />
                    </View>
                </View>
            </View>
            <View style={styles.body}>
                <ScrollView style={{marginBottom: 70,}}>
                    <ImageBackground 
                        resizeMode="cover"
                        source={{ uri: 'https://media.self.com/photos/58d693e3d92aa7631e120f9d/4:3/w_2560%2Cc_limit/GettyImages-486273040.jpg' }} 
                        style={styles.bgImage}> 
                        <View style={styles.overlay}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>Lower-body Burnout</Text>
                            </View>
                            <View style={styles.controlsContainer}>
                                <Animatable.View animation="slideInDown" easing={'linear'}   style={styles.controlsContainerHead}>
                                    <View style={styles.cardCon}>
                                        <Text style={styles.infoH1}>27</Text>
                                        <Text style={styles.infoH2}>Avg. Minutes</Text>
                                    </View>
                                    <Text style={styles.limitter}>|</Text>
                                    <View style={styles.cardCon}>
                                        <Text style={styles.infoH1}>Moderate</Text>
                                        <Text style={styles.infoH2}>Intensity</Text>
                                    </View>
                                    <Text style={styles.limitter}>|</Text>
                                    <View style={styles.cardCon}>
                                        <Text style={styles.infoH1}>Intermediate</Text>
                                        <Text style={styles.infoH2}>Level</Text>
                                    </View>
                                </Animatable.View>
                                <Animatable.View animation="slideInDown" easing={'linear'}  style={styles.controlsContainerHead}> 
                                    <View style={styles.cardConControl}>
                                        <Icon name="ios-settings-outline" size={24} color="#FFF" />
                                    </View>
                                    <TouchableOpacity onPress={() => navigation.navigate('workOutVideo')} style={[styles.cardConControl, { width: 100, height: 100, borderRadius: 100 }]}>
                                        <Icon name="ios-play-outline" size={50} color="#FFF" />
                                    </TouchableOpacity>
                                    <View style={styles.cardConControl}>
                                        <Icon name="ios-musical-notes-outline" size={24} color="#FFF" />
                                    </View>
                                </Animatable.View>
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={styles.middleCard}>
                        <Text style={styles.middleCardH1}>Good for</Text>
                        <Text  style={styles.middleCardH2}>Full Body Flexibility * Hip Mobility * Posture Shoulder Mobility</Text>
                    </View>
                    <View style={styles.middleCard}>
                        <Text style={styles.middleCardH1}>Equipments</Text>
                        <Text  style={styles.middleCardH2}>None</Text>
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
                            workOutPriviews.map((item, index) => { 
                                return (
                                    
                                    <List.Section id={index} key={index}>
                                        <List.Accordion
                                            titleStyle={styles.imageOverlayText}
                                            title={item.title}
                                            left={props => <ImageBackground style={{ width: 70, height: 60, zIndex: -1 }} source={{ uri: 'https://media.self.com/photos/58d693e3d92aa7631e120f9d/4:3/w_2560%2Cc_limit/GettyImages-486273040.jpg' }}>
                                                                <View style={styles.imageOverlay}></View>
                                                            </ImageBackground>}
                                                        >
                                            <List.Item 
                                                    left={props => <Video
                                                                    ref={video}
                                                                    style={styles.videoPriview}
                                                                    source={{
                                                                        uri: 'http://techslides.com/demos/sample-videos/small.mp4',
                                                                    }}
                                                                    useNativeControls={false}
                                                                    resizeMode="contain"
                                                                    isLooping
                                                                    shouldPlay={true}
                                                                    isMuted={true}
                                                                    // onPlaybackStatusUpdate={status => setStatus(() => status)}
                                                                />}                                                                       
                                                    title={''} /> 
                                        </List.Accordion> 
                                    </List.Section> 
                                );
                            })
                        } 
                    </View>
                </ScrollView>
            </View>
        </View>
    ) 
}

const styles = StyleSheet.create({
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
        // backgroundColor: 'rgba(0,0,0,0.1)', 
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