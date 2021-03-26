import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ImageBackground } from 'react-native'; 
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default class ForYouScreen extends Component{
    render(){ 
        return (
            <View style={ styles.conatiner }> 
                <View style={styles.body}>
                    <ScrollView style={{ height: height + 1000}} showsVerticalScrollIndicator={false} horizontal={false}>
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardHeaderText}>Top Picks</Text>
                                <Text style={styles.cardHeaderText2}>Based on your activity</Text>
                            </View>
                            <View style={styles.cardBody}>
                                <ScrollView style={{ padding: 5 }} horizontal showsHorizontalScrollIndicator={false}>                                        
                                    <ImageBackground 
                                        source={{ uri: 'https://media.self.com/photos/58d693e3d92aa7631e120f9d/4:3/w_2560%2Cc_limit/GettyImages-486273040.jpg' }}  style={styles.cardImage}>
                                        <View style={styles.cardText}>
                                            <Icon name="ios-cloud-download-outline" color="black" size={20} />
                                        </View>
                                    </ImageBackground>
                                    <ImageBackground 
                                        source={{ uri: 'https://media.self.com/photos/58d693e3d92aa7631e120f9d/4:3/w_2560%2Cc_limit/GettyImages-486273040.jpg' }}  style={styles.cardImage}>
                                        <View style={styles.cardText}>
                                            <Icon name="ios-cloud-download-outline" color="black" size={20} />
                                        </View>
                                    </ImageBackground> 
                                    <ImageBackground 
                                        source={{ uri: 'https://media.self.com/photos/58d693e3d92aa7631e120f9d/4:3/w_2560%2Cc_limit/GettyImages-486273040.jpg' }}  style={styles.cardImage}>
                                        <View style={styles.cardText}>
                                            <Icon name="ios-cloud-download-outline" color="black" size={20} />
                                        </View>
                                    </ImageBackground> 
                                </ScrollView>
                            </View>
                        </View> 
                   </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conatiner:{
        flex: 1, 
        alignItems: 'center',
    },
    // header:{
    //     width,
    //     height: 50,
    //     padding: 10,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // headerSearchContainer:{
    //     width: width - 60,
    //     height: 40,
    //     backgroundColor: 'rgba(0,0,0,0.1)',
    //     borderRadius: 20,
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     paddingLeft: 20,
    // },
    // input:{
    //     width: '100%',
    //     height: '100%',
    //     paddingLeft: 5,
    // },
    body:{
        marginTop: 10
    },
    card:{ 
        width,
        height: 270, 
        marginVertical: 2, 
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
    }
})