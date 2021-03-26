import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, TouchableOpacity, TextInput } from 'react-native'; 
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function SavedScreen ({navigation}){ 
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
                    <View style={styles.listCon}>
                        <View style={styles.listConLeft}>
                            <ImageBackground style={{ width: '100%', height: '100%', zIndex: -1 }} source={{ uri: 'https://media.self.com/photos/58d693e3d92aa7631e120f9d/4:3/w_2560%2Cc_limit/GettyImages-486273040.jpg' }}>
                                <View style={styles.imageOverlay}>
                                    <Text style={styles.imageOverlayText}>30</Text>
                                    <Text style={styles.imageOverlayText}>Min</Text>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={styles.listConRight}>
                            <Text style={styles.listConRightH1}>360 Drgrees Stronger</Text>
                            <Text style={styles.listConRightH2}>Intermediate - Basic Equipments - Strength</Text>
                        </View>
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