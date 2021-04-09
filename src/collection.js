import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ImageBackground, ActivityIndicator, RefreshControl,  } from 'react-native'; 
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '@expo/vector-icons/Ionicons';
import SearchInput, { createFilter } from 'react-native-search-filter';
import SnackBar from 'rn-snackbar'

const { width, height } = Dimensions.get('window');

const KEYS_TO_FILTERS = ['name', 'sub_collection.name'];
export default class CollectionScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
          userDetails: {},
          loading: true,
          collection: [],
          search: '',
          refreshing: false,
          token: ''
        }
      } 

    async componentDidMount() {   
        this.setState({...this.state, loading: true});
        this.getData(); 
    }
        
    getData = async (tokenId) => {
        var token = await AsyncStorage.getItem('token');
        var userDetails = await AsyncStorage.getItem('userDetails');
        if(token !== null && userDetails !== null){
            this.setState({userDetails: JSON.parse(userDetails), token: JSON.parse(token)}) 
            this.handleColections(JSON.parse(token));
            console.log(JSON.parse(token));
        }else{
            this.props.navigation.navigate('Login');
        }
        return
    } 
 
    handleColections = async (tokenId) => { 
        try { 
            var collection =  await AsyncStorage.getItem('collections');
            if(collection != null){
                this.setState({...this.state, collection: JSON.parse(collection)}); 
                this.setState({...this.state, loading: false});
                this.hardRefresh();
                // console.log('collection', this.state.collection) 
            }else{ 
                this.setState({...this.state, loading: true});
                fetch(`https://quantumleaptech.org/getFit/api/v1/collection`,{
                            headers:{
                                Accept: 'application/json',
                                Authorization: `Bearer ${tokenId}` 
                            }    
                        })
                    .then((response) => response.json())
                    .then(async (json) => {
                        if(json.message == "Unauthenticated."){ 
                            await AsyncStorage.removeItem('token') 
                            await AsyncStorage.removeItem('userDetails') 
                            this.props.navigation.navigate('Login'); 
                        }
                        console.log('collection', json.data) 
                        if(json.status === true && json.data.data.length > 0){ 
                            this.setState({...this.state, collection: json.data}); 
                            await AsyncStorage.setItem('collections', JSON.stringify(json.data)); 
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
            this.setState({...this.state, loading: false});
            console.error('catch error', error);
        } 
    } 
    
    hardRefresh = async () => {
        await AsyncStorage.removeItem('collections'); 
        this.setState({...this.state, refreshing: true});
        fetch(`https://quantumleaptech.org/getFit/api/v1/collection`,{
                    headers:{
                        Accept: 'application/json',
                        Authorization: `Bearer ${this.state.token}` 
                    }    
                })
            .then((response) => response.json())
            .then(async (json) => {
                if(json.message == "Unauthenticated."){ 
                    await AsyncStorage.removeItem('token') 
                    await AsyncStorage.removeItem('userDetails') 
                    this.props.navigation.navigate('Login'); 
                }
                console.log('collection', json.data) 
                if(json.status === true && json.data.data.length > 0){ 
                    this.setState({...this.state, collection: json.data}); 
                    await AsyncStorage.setItem('collections', JSON.stringify(json.data)); 
                    this.setState({...this.state, refreshing: false}); 
                    return true;
                }else{
                    SnackBar.show(json.message, { duration: 4000 });
                    this.setState({...this.state, refreshing: false}); 
                }
            }) 
            .catch((error) => {
                this.setState({...this.state, refreshing: false});
                // console.error(error);
            });
    } 

    render(){ 
        if(this.state.loading){
            return (
                <View style={styles.appLoading}>
                  <ActivityIndicator color="#000" size="large" />
                </View>
            )
          }else{
            const filteredData =  this.state.collection.length !== 0  ? this.state.collection.data.filter(createFilter(this.state.search, KEYS_TO_FILTERS)) : null;
            return (
                <View style={ styles.conatiner }>
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
                            style={{ marginBottom: '10%' }} 
                            showsVerticalScrollIndicator={false} 
                            horizontal={false}>
                                { 
                                    this.state.collection.length == 0 
                                    ?
                                        <View style={styles.appLoading}>
                                            <Icon name="ios-close-sharp" size={24} color="black" />
                                            <Text style={styles.emptyText}>No data yet</Text>
                                        </View>
                                    :
                                    filteredData.map((item, index) => {  
                                       return ( 
                                        <View style={styles.card} key={index}>
                                            <View style={styles.cardHeader}>
                                                <Text style={styles.cardHeaderText}>{ item.name}</Text>
                                            </View>
                                            <View style={styles.cardBody}>
                                                <ScrollView style={{ padding: 5 }} horizontal showsHorizontalScrollIndicator={false}>                                        
                                                    {
                                                        item.sub_collection.reverse().map((item2, index2) => {
                                                            return( 
                                                                <TouchableOpacity key={index2} 
                                                                            onPress={() => this.props.navigation.navigate('subCollection', {
                                                                                                item: item
                                                                                               })
                                                                            }> 
                                                                    <ImageBackground 
                                                                                source={{ uri: 'https://quantumleaptech.org/getFit'+item.image }} 
                                                                                style={styles.cardImage}
                                                                            >
                                                                        <Text style={styles.cardText}>{item2.name}</Text> 
                                                                    </ImageBackground>
                                                                </TouchableOpacity>
                                                            )
                                                        })
                                                    } 
                                                </ScrollView>
                                            </View>
                                        </View> 
                                       )
                                    })
                                }       
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
        height: 250, 
        marginVertical: 2, 
    },
    cardHeader:{ 
        height: 50, 
        justifyContent: 'center', 
    },
    cardHeaderText:{
        fontSize: 17,
        fontFamily: 'Raleway-SemiBold',
        left: '10%',
        textTransform: 'capitalize'
    },
    cardBody:{
        height: 200,   
    },
    cardImage:{
        width: width - 20,
        flex: 1,
        justifyContent: 'center',  
        marginHorizontal: 3,
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