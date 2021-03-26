import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Switch, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function countrySettingsScreen({ navigation }){
    const [ selected, setSelected ] = useState(false);
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContainer}>
                    <Icon name="ios-return-up-back" size={30} color="black" onPress={() => navigation.goBack()} />
                    <Text style={styles.headerText}>Country</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.searchContainer}>
                    <View style={styles.serachCon}>
                        <TextInput
                                style={styles.input}
                                placeholder="Search"
                            />
                    </View> 
                </View>
                <View style={styles.bodyListContainer}> 
                    <ScrollView>
                        <TouchableOpacity style={styles.listContainer}>
                            <Text style={styles.listContainerText}>united State</Text>  
                            <View style={styles.radioButon}></View>
                        </TouchableOpacity>     
                        <TouchableOpacity style={styles.listContainer}>
                            <Text style={styles.listContainerText}>Argentina</Text>  
                            <View style={styles.radioButon}></View>
                        </TouchableOpacity>   
                        <TouchableOpacity style={styles.listContainer}>
                            <Text style={styles.listContainerText}>Australia</Text>  
                            <View style={[styles.radioButon, { backgroundColor: '#000' }]}></View>
                        </TouchableOpacity>   
                        <TouchableOpacity style={styles.listContainer}>
                            <Text style={styles.listContainerText}>Austra</Text>  
                            <View style={styles.radioButon}></View>
                        </TouchableOpacity>   
                        <TouchableOpacity style={styles.listContainer}>
                            <Text style={styles.listContainerText}>Belgum</Text>  
                            <View style={styles.radioButon}></View>
                        </TouchableOpacity> 
                    </ScrollView> 
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
        fontSize: 12,
        fontFamily: 'Raleway-Regular', 
        textTransform: 'uppercase'
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
    },
    searchContainer:{
        width,
        padding: 10, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    serachCon:{
        width: '80%',
        height: 40,
        justifyContent: 'center', 
        backgroundColor: '#FFF',
        borderRadius: 20,
        elevation: 1
    },
    input:{
        left: 22,
        color: '#000', 
        fontFamily: 'Raleway-Regular', 
    },
    radioButon:{
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: '#FFF',
        elevation: 1
    }
});