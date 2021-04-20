import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ImageBackground, Pressable, ActivityIndicator, RefreshControl, SafeAreaView } from 'react-native'; 
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '@expo/vector-icons/Ionicons';
import SnackBar from 'rn-snackbar'
import SearchInput, { createFilter } from 'react-native-search-filter';

const { width, height } = Dimensions.get('window');

export default class ForYouScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
          userDetails: {}, 
          loading: true,
          workOuts: [],
          search: '',
          refreshing: false,
          token: ''
        }
    }  

    async componentDidMount() {     
        this.getData();
        this.props.navigation.addListener('focus', () => {
            this.hardRefresh();
          });
    }
         
    getData = async () => {   
        // await AsyncStorage.removeItem('savedWorkouts');
        var token = await AsyncStorage.getItem('token');
        var userDetails = await AsyncStorage.getItem('userDetails');  
        if(token !== null && userDetails !== null){
            this.setState({userDetails: JSON.parse(userDetails), token: JSON.parse(token)}) 
            this.handleWorkOuts(JSON.parse(token));
            // console.log(JSON.parse(token));
        }else{
            this.props.navigation.navigate('Login');
        }
        return
    } 

    handleWorkOuts = async (tokenId) => { 
        try { 
            this.setState({...this.state, loading: true});
            var workOuts =  await AsyncStorage.getItem('workOuts');
            // console.log(workOuts);
            if(workOuts != null){ 
                // console.log('From Here');
                this.setState({...this.state, workOuts: JSON.parse(workOuts)});  
                this.setState({...this.state, loading: false});
                this.hardRefresh();
            }else{ 
                this.setState({...this.state, loading: true});
                fetch(`https://quantumleaptech.org/getFit/api/v1/workout`,{
                        headers:{
                            Accept: 'application/json',
                            Authorization: `Bearer ${tokenId}` 
                        }    
                    })
                    .then((response) => response.json())
                    .then(async (json) => {
                        // console.log(json);
                        if(json.message == "Unauthenticated."){ 
                            await AsyncStorage.removeItem('token') 
                            await AsyncStorage.removeItem('userDetails') 
                            this.props.navigation.navigate('Login');
                            return true; 
                        } 
                        // console.log(json) 
                        if(json.status === true && json.data.data.length > 0){ 
                            this.setState({...this.state, workOuts: json.data}); 
                            // console.log(this.state.workOuts) 
                            await AsyncStorage.setItem('workOuts', JSON.stringify(json.data)); 
                            this.setState({...this.state, loading: false}); 
                            return true;
                        }else{  
                            SnackBar.show(json.message, { duration: 4000 });
                            this.setState({...this.state, loading: false}); 
                        }
                    }) 
                    .catch((error) => {
                        this.setState({...this.state, loading: false});
                        // console.error(error);
                    });
            }
        } catch (error) {  
            // console.error('catch error', error);
        }         
    } 

    hardRefresh = async () => {
        await AsyncStorage.removeItem('workOuts'); 
        // SnackBar.show('Making the world happier', { duration: 4000 })
        this.setState({...this.state,  refreshing: true});
        fetch(`https://quantumleaptech.org/getFit/api/v1/workout`,{
                headers:{
                    Accept: 'application/json',
                    Authorization: `Bearer ${this.state.token}` 
                }    
            })
            .then((response) => response.json())
            .then(async (json) => {
                // console.log(json);
                if(json.message == "Unauthenticated"){ 
                    await AsyncStorage.removeItem('token') 
                    await AsyncStorage.removeItem('userDetails') 
                        this.props.navigation.navigate('Login'); 
                }
                // this.setState({...this.state, loading: false}); 
                if(json.status === true && json.data.data.length > 0){ 
                    // console.log(json) ;
                    SnackBar.show('Fetched successfully', { duration: 4000  }) 
                    await AsyncStorage.setItem('workOuts', JSON.stringify(json.data)); 
                    this.setState({...this.state, workOuts: json.data, refreshing: false}); 
                    return true;
                }else{
                    SnackBar.show(json.message, { duration: 4000  }) 
                    this.setState({...this.state, refreshing: false }); 
                }
            }) 
            .catch((error) => {
                this.setState({...this.state, refreshing: false });
                // console.error(error);
            });
    }

    saveWorkOut = async (id) => {
        var savedWorkouts = await AsyncStorage.getItem('savedWorkouts');
        if(savedWorkouts !== null){
            var alreadySavedWorkOut = JSON.parse(savedWorkouts);
            alreadySavedWorkOut[id.id] = id;
            // console.log(alreadySavedWorkOut)
            await AsyncStorage.setItem('savedWorkouts', JSON.stringify(alreadySavedWorkOut));
            SnackBar.show('Saved successfully', { duration: 4000 }) 
        }else{
            var newSavedWorkOut = new Object();
            newSavedWorkOut[id.id] = id;
            await AsyncStorage.setItem('savedWorkouts', JSON.stringify(newSavedWorkOut));
            SnackBar.show('Saved successfully', { duration: 4000 }) 
        }
        return true;
    }

    render(){ 
        
        if(this.state.loading == true){
            return (
                <View style={styles.appLoading}>
                  <ActivityIndicator color="#000" size="large" />
                </View>
            )
        }else{
            return (
                <View style={ styles.conatiner }> 
                    <View style={styles.body}>
                        <ScrollView                 
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.hardRefresh}
                                    />
                                } 
                                style={{ height: height + 1000}} 
                                showsVerticalScrollIndicator={false} horizontal={false}>
                            <View style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardHeaderText}>New Work Outs</Text>
                                    {/* <Text style={styles.cardHeaderText2}>Based on your activity</Text> */}
                                </View>
                                <View style={styles.cardBody}>
                                    <ScrollView       
                                        style={{ padding: 5 }} 
                                        horizontal 
                                        showsHorizontalScrollIndicator={false}
                                        howsHorizontalScrollIndicator={false}>  
                                         { 
                                            this.state.workOuts.length == 0 
                                            ?
                                                <View style={styles.appLoading}>
                                                    <Icon name="ios-close-sharp" size={24} color="black" />
                                                    <Text style={styles.emptyText}>No data yet</Text>
                                                </View>
                                            :
                                                this.state.workOuts.data.reverse().map((item, index) => {   
                                                return (
                                                        <Pressable 
                                                                style={styles.cardWorkOut} 
                                                                key={index}  
                                                                onPress={() => this.props.navigation.navigate('previewVideo', {
                                                                    items: item
                                                                }) }>  
                                                            <ImageBackground 
                                                                source={{ uri: 'https://quantumleaptech.org/getFit'+item.image }}  style={styles.cardImage}>
                                                                <View style={styles.cardText}>
                                                                    <Icon name="ios-cloud-download-outline" color="black" size={20} onPress={() => this.saveWorkOut(item) } />
                                                                </View>
                                                            </ImageBackground>
                                                            <View >
                                                                <Text style={styles.cardFooterText}>{item.name}</Text>
                                                                <Text style={styles.cardFooterTextDesc}>{item.avg_min} - {item.intensity}</Text>
                                                            </View>
                                                        </Pressable>
                                                    )
                                                })
                                        }                           
                                    </ScrollView>
                                </View>
                            </View> 
                    </ScrollView>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    appLoading:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
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
        // height: 270, 
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
        padding: 10,
    },
    cardWorkOut:{
        height: 300,
    },
    cardImage:{
        width: width / 2,
        flex: 1, 
        alignItems: 'flex-end',  
        marginHorizontal: 3,
        resizeMode: 'cover'
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
    cardFooterText:{ 
        color: '#000',   
        fontFamily: 'Raleway-Bold', 
        textTransform: 'capitalize'
    },
    cardFooterTextDesc:{  
        color: 'grey',    
        fontFamily: 'Raleway-Regular', 
        textTransform: 'capitalize'
    },
    emptyText:{ 
        fontSize: 16,
        fontFamily: 'Raleway-SemiBold',
        color: '#000',  
        textAlign: 'center'
    }
})