import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Switch, Alert, TextInput, Pressable, Modal, TouchableHighlight, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import SnackBar from 'rn-snackbar';

const { width, height } = Dimensions.get('window');

export default function musicPlaylistScreen({ navigation }){
    const [ token, setToken ] = useState('');
    const [ userDetails, setUserDetails ] = useState({});  
    const [ loading, setLoading ] = useState(false);
    const [ selected, setSelected ] = useState(false);
    const [ modalVisible, setModalVisible ] = useState(false);

    useEffect(() => {
       getUserDetails(); 
    },[])

    const getUserDetails = async () => {
        setLoading(true);
        var token = await AsyncStorage.getItem('token');
        var userDetails = await AsyncStorage.getItem('userDetails');
        // console.log(token);
        if(token !== null && userDetails !== null){ 
            setToken(JSON.parse(token));  
            var data = JSON.parse(userDetails); 
            setUserDetails(data);
            setLoading(false);
            return true;
        }else{
            navigation.navigate('Login');
        }  
        return false
    }   

    if(loading == true){
        return (
            <View style={styles.appLoading}>
                <ActivityIndicator color="#000" size="large" />
            </View>
        )
    } 

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContainer}>
                    <Icon name="ios-return-up-back" size={30} color="black" onPress={() => navigation.goBack()} />
                    <Text style={styles.headerText}>Music</Text>
                </View>
                {/* <TouchableOpacity style={styles.saveButton} onPress={() => saveMyDetails()}>
                    <Icon name="ios-checkmark" size={24} color="black" />
                </TouchableOpacity> */}
            </View>
            <View style={styles.body}>
                <View style={styles.musicContainer}>

                </View>
                 <View style={styles.bodyListContainer}> 
                    <TouchableOpacity style={[styles.listContainer, { borderLeftWidth: 5, borderLeftColor: '#000' }]}  >
                        <Text style={styles.listContainerText}> <Icon name="ios-musical-notes-outline" size={24} color="black" /> Music</Text>
                    </TouchableOpacity> 
                    <View style={[styles.listContainer, { padding: 20 }]}>                        
                        <Text style={styles.listContainerTabText}>Shuffle Library</Text> 
                        <Switch thumbColor="black" value={selected}  onChange={() =>  setSelected(!selected)}  />  
                        {/* <Text style={[styles.listContainerTabText, { padding: 10, fontSize: 13,opacity: 30 }]}>*if you don't wish to enter your height and weight, select the "use default"
                        option and we will use a default value to perform these these calculation </Text> onPress={() => setModalVisible(true)}  */}
                    </View> 
                    <TouchableOpacity style={[styles.listContainer, { borderLeftWidth: 5, borderLeftColor: '#000' }]} >
                        <Text style={styles.listContainerText}> <Icon name="volume-mute" size={24} color="black" /> Other / No Music</Text>
                    </TouchableOpacity> 
                </View>           
            </View>
            
            <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                <TouchableHighlight style={styles.centeredView} onPress={() => setModalVisible(false) }>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.listContainer} onPress={() => selectGender('male')}>
                            <Text style={styles.listContainerText}>Male</Text>  
                            {/* <View style={styles.radioButon}></View> */}
                        </TouchableOpacity>  
                        <TouchableOpacity style={styles.listContainer} onPress={() => selectGender('female')}>
                            <Text style={styles.listContainerText}>Female</Text>  
                            {/* <View style={styles.radioButon}></View> */}
                        </TouchableOpacity>  
                    </View>
                </TouchableHighlight>
            </Modal>
        </View>
    );
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
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderWidth: .1,
        elevation: 1,
        flexDirection: 'row',
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
    saveButton:{
        width: 80,
        height: 80, 
        padding: 20, 
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    body:{
        width,
    },
    listContainerTab:{
        width: '100%',
        minHeight: 40,
        borderWidth: .1,
        elevation: .3,
        backgroundColor: '#FFF', 
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
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row', 
    },
    listContainerText:{
        fontSize: 16,
        fontFamily: 'Raleway-SemiBold', 
    },
    musicContainer:{
        width,
        height: 250,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center", 
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        width,
        height: height/ 2,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});