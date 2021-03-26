import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function indexScreen({ navigation }){
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContainer}>
                    <Icon name="ios-return-up-back" size={30} color="black" onPress={() => navigation.goBack()} />
                    <Text style={styles.headerText}>Settings</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyListContainer}>
                    <TouchableOpacity style={styles.listContainer}>
                        <Text style={styles.listContainerText}>Email</Text>
                        <Text style={[styles.listContainerText, { fontSize: 14 }]}>johndoe@gmail.com</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listContainer} >
                        <Text style={styles.listContainerText}>Mobile Number</Text> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listContainer} onPress={() => navigation.navigate('aboutYouSettings')}>
                        <Text style={styles.listContainerText}>About You</Text> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listContainer} onPress={() =>  navigation.navigate('uniteOfMesaureSettings') }>
                        <Text style={styles.listContainerText}>Unit 0f Measure</Text> 
                    </TouchableOpacity>
                    <View style={styles.listContainerTab}>  
                    </View>
                    <TouchableOpacity style={styles.listContainer}  onPress={() =>  navigation.navigate('workSettings') }>
                        <Text style={styles.listContainerText}>Work Out Settings</Text> 
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.listContainer}>
                        <Text style={styles.listContainerText}>Notification Preferences</Text> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listContainer}>
                        <Text style={styles.listContainerText}>Privacy Settings</Text> 
                    </TouchableOpacity>
                    <View style={styles.listContainerTab}>  
                    </View>
                    <TouchableOpacity style={styles.listContainer}  onPress={() =>  navigation.navigate('countrySettings') }  >
                        <Text style={styles.listContainerText}>Country/Region</Text> 
                    </TouchableOpacity> 
                </View>
            </View>
        </View>
    );
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
    listContainerTab:{
        width: '100%',
        height: 20,
        padding: 20,
        borderWidth: .1,
        elevation: .3, 
        backgroundColor: 'rgba(0,0,0,0.05)',
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
    }
});