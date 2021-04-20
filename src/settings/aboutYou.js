import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Switch, Alert, TextInput, Pressable, Modal, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import SnackBar from 'rn-snackbar'

const { width, height } = Dimensions.get('window');

export default function aboutYouScreen({ navigation }){
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
    
    const selectGender = async (type) =>{
        setUserDetails({ ...userDetails, gender: type });
        setModalVisible(false);
    }

    const saveMyDetails = async () => { 
        setLoading(true); 
        await fetch('https://quantumleaptech.org/getFit/api/v1/user/update', {
                        method: 'POST',
                        body: JSON.stringify({
                            user_id: userDetails.id,
                            gender: userDetails.gender,
                            weight: userDetails.weight,
                            height: userDetails.height,
                            phone_number: userDetails.phone,
                        }),
                        headers:{
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}` 
                        }    
                    })
                    .then((response) => response.json())
                    .then(async (json) => {
                        setLoading(false);
                        console.log(json)
                        if(json.status === true){  
                            await AsyncStorage.removeItem('userDetails');
                            userDetails.user_settings.gender = json.data.gender;
                            userDetails.user_settings.weight = json.data.weight;
                            userDetails.user_settings.height = json.data.height;  
                            userDetails.user_settings.phone_number = json.data.phone_number;                              
                            await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails)); 
                            SnackBar.show('Saved successfully', { duration: 4000 })  
                            return true;
                        }else{
                            SnackBar.show(json.message, { duration: 4000  })  
                        }
                    }) 
                    .catch((error) => { 
                        setLoading(false);
                        console.error(error);
                    });
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
                    <Text style={styles.headerText}>About</Text>
                </View>
                <TouchableOpacity style={styles.saveButton} onPress={() => saveMyDetails()}>
                    <Icon name="ios-checkmark" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyListContainer}>
                    <View style={[styles.listContainerTab, { padding: 30 }]}>  
                        <Text style={styles.listContainerTabText}>We'd like this information to provide 
                            more aqurate results, such as run distance, pace and calories. 
                        <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Learn More</Text> </Text>
                    </View> 
                    <TouchableOpacity style={styles.listContainer} onPress={() => setModalVisible(true)}>
                        <Text style={styles.listContainerText}>Gender</Text>
                        <Text style={[styles.listContainerText, { fontSize: 14, textTransform: 'capitalize' }]}>{  userDetails.user_settings ? userDetails.user_settings.gender : '' }</Text>
                    </TouchableOpacity>
                    <View style={styles.listContainerTab}>  
                    </View> 
                    <TouchableOpacity style={styles.listContainer}>
                        <Text style={styles.listContainerText}>Height</Text> 
                        <View style={[styles.listContainerText]}>
                            <TextInput
                                    style={styles.input}
                                    placeholder={'0'}
                                    value={ userDetails.user_settings ? userDetails.user_settings.height  : ''}
                                    onChangeText={value => setUserDetails({ ...userDetails, height: value }) }
                                />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listContainer}>
                        <Text style={styles.listContainerText}>Weight</Text> 
                        <View style={[styles.listContainerText]}>
                            <TextInput
                                    style={styles.input}
                                    placeholder={'0'}
                                    value={ userDetails.user_settings ? userDetails.user_settings.weight  : ''}
                                    onChangeText={value => setUserDetails({ ...userDetails, weight: value }) }
                                />
                        </View>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.listContainer}>
                        <Text style={styles.listContainerText}>Phone</Text> 
                        <View style={[styles.listContainerText]}>
                            <TextInput
                                    style={styles.input}
                                    placeholder={'0'}
                                    value={ userDetails.phone_number }
                                    onChangeText={value => setUserDetails({ ...userDetails, phone_number: value }) }
                                />
                        </View>
                    </TouchableOpacity> 
                    <View style={[styles.listContainerTab, { padding: 20 }]}> 
                        <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
                            <Switch thumbColor="black" value={selected}  onChange={() =>  setSelected(!selected)}  />   
                            <Text style={styles.listContainerTabText}>Use default height and width</Text>                         
                        </View> 
                        <Text style={[styles.listContainerTabText, { padding: 10, fontSize: 13,opacity: 30 }]}>
                            *if you don't wish to enter your height and weight, select the "use default"
                        option and we will use a default value to perform these these calculation </Text> 
                    </View> 
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
                <View style={styles.centeredView}>
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
                </View>
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
        padding: 10,  
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    listContainerText:{
        fontSize: 16,
        fontFamily: 'Raleway-SemiBold', 
    },
    input:{
        flex: 1,
        fontSize: 12,
        fontFamily: 'Raleway-Bold', 
    },
    radioButon:{
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: '#FFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center", 
    },
    modalView: {
        width,
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