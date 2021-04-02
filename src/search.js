import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ImageBackground, ActivityIndicator, RefreshControl } from 'react-native'; 
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
          refreshing: false
        }
    } 

    componentDidMount() {  
        this.getData();
        this.handleCategories();
    }
        
    getData = async () => {
        var token = await AsyncStorage.getItem('token');
        var userDetails = await AsyncStorage.getItem('userDetails');
        // console.log(token);
        if(token !== null && userDetails !== null){
            this.setState({userDetails: JSON.parse(userDetails), token: JSON.parse(token)}) 
        }else{
            navigation.navigate('Login');
        }
        return
    } 

    handleCategories = async () => { 
        try { 
            this.setState({...this.state, loading: true});
            var categories =  await AsyncStorage.getItem('categories');
            // console.log(JSON.parse(categories));
            if(categories != null){ 
                this.setState({...this.state, categories: JSON.parse(categories)});  
                this.setState({...this.state, loading: false});
            }else{ 
                this.setState({...this.state, loading: true});
                fetch(`https://quantumleaptech.org/getFit/api/v1/category`)
                    .then((response) => response.json())
                    .then(async (json) => {
                        this.setState({...this.state, loading: false}); 
                        if(json.status === true && json.data.data.length > 0){ 
                            this.setState({...this.state, categories: json.data}); 
                            // console.log(this.state.categories)
                            await AsyncStorage.setItem('categories', JSON.stringify(json.data)); 
                            return true;
                        }else{
                            console.log(json.message);
                        }
                    }) 
                    .catch((error) => {
                        this.setState({...this.state, loading: false});
                        console.error(error);
                    });
            }
        } catch (error) {  
            console.error('catch error', error);
        }         
    } 

    hardRefresh = async () => {
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
                // this.setState({...this.state, loading: false}); 
                if(json.status === true && json.data.data.length > 0){ 
                    console.log(json.data.data) ;
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
                console.error(error);
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
            const filteredData = this.state.categories.data.filter(createFilter(this.state.search, KEYS_TO_FILTERS))
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
                                style={{ height: height + 1000}} showsVerticalScrollIndicator={false} horizontal={false}>
                            { 
                                filteredData.map((item, index) => { 
                                    console.log(item.image);
                                   return (
                                    <TouchableOpacity 
                                            style={styles.card} 
                                            key={index} 
                                            resizeMode='cover' 
                                            onPress={() => this.props.navigation.navigate('subSearch', {
                                                                                    subCategories: item
                                                                                })}>
                                        <ImageBackground 
                                            source={{ uri: 'https://media.self.com/photos/58d693e3d92aa7631e120f9d/4:3/w_2560%2Cc_limit/GettyImages-486273040.jpg' }}  style={styles.cardImage}>
                                            <Text style={styles.cardText}>{ item.name} </Text>  
                                        </ImageBackground>
                                    </TouchableOpacity>
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
        backgroundColor: 'rgba(0,0,0,0.03)'
    },
    cardText:{
        fontSize: 16,
        fontFamily: 'Raleway-Bold',
        color: '#FFF',  
        left: '10%',
    }
})