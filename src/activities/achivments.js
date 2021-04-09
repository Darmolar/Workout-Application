import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ImageBackground } from 'react-native'; 
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default class AchievementsScreen extends Component{
    render(){ 
        return (
            <ScrollView style={ styles.conatiner} showsVerticalScrollIndicator={false}> 
                <View style={styles.header}>
                    <Text>Latest Achivements</Text>
                    <ScrollView horizontal={true} >
                        <View style={styles.cardAchive}>
                            <Text style={styles.cardAchiveText}>1 Work out</Text>
                        </View>
                        <View style={styles.cardAchiveAlt}>
                            <Text style={styles.cardAchiveTextAlt}>Work Out to earn more Achievements</Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.body}>
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardHeaderText}>Your Achievements</Text> 
                        </View> 
                    </View>  
                    {/* <View style={{ width }} >                        
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
                                <Text style={styles.listConRightH2}>Wed 17, 21  3:01</Text>
                            </View>
                        </View>   
                   </View> */}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    conatiner:{
        flex: 1,  
    },
    header:{
        width,
        height: 300, 
        margin: 20
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
    cardAchive:{
        width: width / 2.5,
        marginTop: 10,
        height: '95%',
        backgroundColor: '#000',
        borderRadius: 15,
        justifyContent: 'flex-end',
        padding: 15
    },
    cardAchiveText:{
        color: '#FFF',
        fontSize: 14,
    },
    cardAchiveAlt:{ 
        width: width / 2,
        marginTop: 10,
        height: '95%',
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginHorizontal: 5,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginHorizontal: 5,
    },
    cardAchiveTextAlt:{ 
        color: '#000',
        fontSize: 25,
        fontFamily: 'Raleway-ExtraBold', 
        textAlign: 'center',
        textTransform: 'capitalize'
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
})