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
const KEYS_TO_FILTERS = ['name'];
export default class SearchScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
          userDetails: {}, 
          loading: true,
          categories: [],
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
        var token = await AsyncStorage.getItem('token');
        var userDetails = await AsyncStorage.getItem('userDetails');
        // console.log(token);
        if(token !== null && userDetails !== null){
            this.setState({userDetails: JSON.parse(userDetails), token: JSON.parse(token)}) 
            this.handleCategories(JSON.parse(token));
        }else{
            this.props.navigation.navigate('Login');
        }
        return
    } 

    handleCategories = async (tokenId) => { 
        try { 
            this.setState({...this.state, loading: true});
            var categories =  await AsyncStorage.getItem('categories');
            if(categories != null){ 
                console.log('From Here');
                this.setState({...this.state, categories: JSON.parse(categories)});  
                this.setState({...this.state, loading: false});
                this.hardRefresh();
            }else{ 
                this.setState({...this.state, loading: true});
                fetch(`https://quantumleaptech.org/getFit/api/v1/category`,{
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
                        if(json.status === true && json.data.data.length > 0){ 
                            this.setState({...this.state, categories: json.data}); 
                            // console.log(this.state.categories) 
                            await AsyncStorage.setItem('categories', JSON.stringify(json.data)); 
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
        await AsyncStorage.removeItem('categories'); 
        // SnackBar.show('Making the world happier', { duration: 4000 })
        this.setState({...this.state,  refreshing: true});
        fetch(`https://quantumleaptech.org/getFit/api/v1/category`,{
                headers:{
                    Accept: 'application/json',
                    Authorization: `Bearer ${this.state.token}` 
                }    
            })
            .then((response) => response.json())
            .then(async (json) => {
                console.log(json);
                if(json.message == "Unauthenticated"){ 
                    await AsyncStorage.removeItem('token') 
                    await AsyncStorage.removeItem('userDetails') 
                        this.props.navigation.navigate('Login'); 
                }
                // this.setState({...this.state, loading: false}); 
                if(json.status === true && json.data.data.length > 0){ 
                    console.log(json) ;
                    SnackBar.show('Fetched successfully', { duration: 4000  }) 
                    await AsyncStorage.setItem('categories', JSON.stringify(json.data)); 
                    this.setState({...this.state, categories: json.data, refreshing: false}); 
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
 
    render(){ 
        if(this.state.loading == true){
            return (
                <View style={styles.appLoading}>
                  <ActivityIndicator color="#000" size="large" />
                </View>
            )
          }else { 
            const filteredData =  this.state.categories.length !== 0 ? this.state.categories.data.filter(createFilter(this.state.search, KEYS_TO_FILTERS)) : null;
            return (
                <SafeAreaView style={ styles.conatiner }>
                    <View style={styles.header}>
                        <View style={styles.headerSearchContainer}>
                            <Icon name="ios-search" size={16} color="grey" />
                            <TextInput
                                style={styles.input}
                                placeholder={'Search'}
                                onChangeText={value => this.setState({ ...this.state, search: value })} 
                            />
                        </View>
                    </View>
                    <View style={styles.body}>
                        <ScrollView 
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.hardRefresh}
                                    />
                                }
                                style={{ marginBottom: '15%' }}
                                showsVerticalScrollIndicator={false} 
                                horizontal={false}
                            >
                            { 
                                this.state.categories.length == 0 
                                ?
                                    <View style={styles.appLoading}>
                                        <Icon name="ios-close-sharp" size={24} color="black" />
                                        <Text style={styles.emptyText}>No data yet</Text>
                                    </View>
                                :
                                    filteredData.reverse().map((item, index) => {  
                                        return (
                                            <Pressable 
                                                    style={styles.card} 
                                                    key={index}  
                                                    onPress={() => this.props.navigation.navigate('subSearch', {
                                                                                            subCategories: item
                                                                                        })}>
                                                <ImageBackground 
                                                    source={{ uri: 'https://quantumleaptech.org/getFit'+item.image }}  style={styles.cardImage}>
                                                    <View style={styles.overLay}>
                                                        <Text style={styles.cardText}>{ item.name} </Text> 
                                                    </View>
                                                </ImageBackground>
                                            </Pressable>
                                        )
                                    })
                            }                             
                        </ScrollView>
                    </View>
                </SafeAreaView>
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
        marginVertical: 5,  
        zIndex: 1
    },
    cardImage:{
        flex: 1,  
    },
    overLay:{
        flex: 1,
        justifyContent: 'center', 
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    cardText:{
        fontSize: 16,
        fontFamily: 'Raleway-Bold',
        color: '#FFF',  
        left: '10%',
    },
    emptyText:{ 
        fontSize: 16,
        fontFamily: 'Raleway-SemiBold',
        color: '#000',  
    }
})