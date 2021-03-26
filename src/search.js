import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ImageBackground } from 'react-native'; 
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default class SearchScreen extends Component{
    render(){ 
        return (
            <View style={ styles.conatiner }>
                <View style={styles.header}>
                    <View style={styles.headerSearchContainer}>
                        <Icon name="ios-search" size={16} color="grey" />
                        <TextInput
                            style={styles.input}
                            placeholder={'Search'}
                        />
                    </View>
                </View>
                <View style={styles.body}>
                    <ScrollView style={{ height: height + 1000}} showsVerticalScrollIndicator={false} horizontal={false}>
                        <View style={styles.card}>
                            <ImageBackground 
                                source={{ uri: 'https://media.self.com/photos/58d693e3d92aa7631e120f9d/4:3/w_2560%2Cc_limit/GettyImages-486273040.jpg' }}  style={styles.cardImage}>
                                <Text style={styles.cardText}>Muscle Group</Text>
                            </ImageBackground>
                        </View>
                        <View style={styles.card}>
                            <ImageBackground 
                                source={{ uri: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F35%2F2019%2F10%2F08153808%2FGettyImages-940256188.jpg' }}  style={styles.cardImage}>
                                <Text style={styles.cardText}>Muscle Group</Text>
                            </ImageBackground>
                        </View>
                        <View style={styles.card}>
                            <ImageBackground 
                                source={{ uri: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }}  style={styles.cardImage}>
                                <Text style={styles.cardText}>Muscle Group</Text>
                            </ImageBackground>
                        </View>
                        <View style={styles.card}>
                            <ImageBackground 
                                source={{ uri: 'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/322/322692/what-to-eat-after-a-workout.jpg?w=1155&h=1541' }}  style={styles.cardImage}>
                                <Text style={styles.cardText}>Muscle Group</Text>
                            </ImageBackground>
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
    header:{
        width,
        height: 50,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerSearchContainer:{
        width: width - 60,
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
    },
    input:{
        width: '100%',
        height: '100%',
        paddingLeft: 5,
    },
    body:{
        marginTop: 10
    },
    card:{ 
        width,
        height: 200, 
        marginVertical: 2, 
    },
    cardImage:{
        flex: 1,
        justifyContent: 'center', 
    },
    cardText:{
        fontSize: 16,
        fontFamily: 'Raleway-Bold',
        color: '#FFF',  
        left: '10%',
    }
})