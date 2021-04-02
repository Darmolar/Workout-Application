import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ImageBackground, ActivityIndicator } from 'react-native'; 
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default class CollectionScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
          userDetails: {},
          loading: true,
          collection: [],
        }
      } 
      componentDidMount() {  
        this.setState({...this.state, loading: true});
        this.getData();
        
      }
        
     getData = async (tokenId) => {
        var token = await AsyncStorage.getItem('token');
        var userDetails = await AsyncStorage.getItem('userDetails');
        // console.log(token);
        if(token !== null && userDetails !== null){
            this.setState({userDetails: JSON.parse(userDetails), token: JSON.parse(token)}) 
            this.handleColections(JSON.parse(token));
        }else{
            navigation.navigate('Login');
        }
        return
     } 
 
     handleColections = async (tokenId) => { 
        try { 
            var collection =  await AsyncStorage.getItem('collections');
            if(collection != null){
                this.setState({...this.state, collection: JSON.parse(collection)}); 
                this.setState({...this.state, loading: false});
                console.log('collection', this.state.collection) 
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
                                navigation.navigate('Login'); 
                        }
                        console.log('collection', json.data) 
                        if(json.status === true && json.data.data.length > 0){ 
                            this.setState({...this.state, collection: json.data}); 
                            await AsyncStorage.setItem('collections', JSON.stringify(json.data)); 
                            this.setState({...this.state, loading: false}); 
                            return true;
                        }else{
                            console.log(json.message);
                            this.setState({...this.state, loading: false}); 
                        }
                    }) 
                    .catch((error) => {
                        this.setState({...this.state, loading: false});
                        console.error(error);
                    });
            }
        } catch (error) { 
            this.setState({...this.state, loading: false});
            console.error('catch error', error);
        } 
    }

    render(){ 
        if(this.state.loading){
            return (
                <View style={styles.appLoading}>
                  <ActivityIndicator color="#000" size="large" />
                </View>
            )
          }else{
            return (
                <View style={ styles.conatiner }>
                    {/* <View style={styles.header}>
                        <View style={styles.headerSearchContainer}>
                            <Icon name="ios-search" size={16} color="grey" />
                            <TextInput
                                style={styles.input}
                                placeholder={'Search'}
                            />
                        </View>
                    </View> */}
                    <View style={styles.body}>
                        
                        <ScrollView style={{ height: height + 1000}} showsVerticalScrollIndicator={false} horizontal={false}>
                                { 
                                    this.state.collection.data.map((item, index) => { 
                                       return ( 
                                        <View style={styles.card} key={index}>
                                            <View style={styles.cardHeader}>
                                                <Text style={styles.cardHeaderText}>{ item.name}</Text>
                                            </View>
                                            <View style={styles.cardBody}>
                                                <ScrollView style={{ padding: 5 }} horizontal showsHorizontalScrollIndicator={false}>                                        
                                                    {
                                                        item.sub_collection.map((item2, index2) => {
                                                            return( 
                                                                <ImageBackground 
                                                                    key={index2}
                                                                    source={{ uri: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }}  style={styles.cardImage}>
                                                                    <Text style={styles.cardText}>{item2.name}</Text>
                                                                    {/* <Text>{'https://quantumleaptech.org/getFit'+item.image}</Text> */}
                                                                </ImageBackground>
                                                            )
                                                        })
                                                    }
                                                    {/* <ImageBackground 
                                                        source={{ uri: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }}  style={styles.cardImage}>
                                                        <Text style={styles.cardText}>Muscle Group</Text>
                                                    </ImageBackground>
                                                    <ImageBackground 
                                                        source={{ uri: 'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/322/322692/what-to-eat-after-a-workout.jpg?w=1155&h=1541' }}  style={styles.cardImage}>
                                                        <Text style={styles.cardText}>Muscle Group</Text>
                                                    </ImageBackground> */}
                                                </ScrollView>
                                            </View>
                                        </View> 
                                       )
                                    })
                                }      
                            {/* <View style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardHeaderText}>Top Picks</Text>
                                </View>
                                <View style={styles.cardBody}>
                                    <ScrollView style={{ padding: 5 }} horizontal showsHorizontalScrollIndicator={false}>                                        
                                        <ImageBackground 
                                            source={{ uri: 'https://media.self.com/photos/58d693e3d92aa7631e120f9d/4:3/w_2560%2Cc_limit/GettyImages-486273040.jpg' }}  style={styles.cardImage}>
                                            <Text style={styles.cardText}>Muscle Group</Text>
                                        </ImageBackground>
                                        <ImageBackground 
                                            source={{ uri: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }}  style={styles.cardImage}>
                                            <Text style={styles.cardText}>Muscle Group</Text>
                                        </ImageBackground>
                                        <ImageBackground 
                                            source={{ uri: 'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/322/322692/what-to-eat-after-a-workout.jpg?w=1155&h=1541' }}  style={styles.cardImage}>
                                            <Text style={styles.cardText}>Muscle Group</Text>
                                        </ImageBackground>
                                    </ScrollView>
                                </View>
                            </View> 
                            <View style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardHeaderText}>Life Hacks</Text>
                                </View>
                                <View style={styles.cardBody}>
                                    <ScrollView style={{ padding: 5 }} horizontal showsHorizontalScrollIndicator={false}>                                        
                                        <ImageBackground 
                                            source={{ uri: 'https://media.self.com/photos/58d693e3d92aa7631e120f9d/4:3/w_2560%2Cc_limit/GettyImages-486273040.jpg' }}  style={styles.cardImage}>
                                            <Text style={styles.cardText}>Muscle Group</Text>
                                        </ImageBackground>
                                        <ImageBackground 
                                            source={{ uri: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }}  style={styles.cardImage}>
                                            <Text style={styles.cardText}>Muscle Group</Text>
                                        </ImageBackground>
                                        <ImageBackground 
                                            source={{ uri: 'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/322/322692/what-to-eat-after-a-workout.jpg?w=1155&h=1541' }}  style={styles.cardImage}>
                                            <Text style={styles.cardText}>Muscle Group</Text>
                                        </ImageBackground>
                                    </ScrollView>
                                </View>
                            </View> 
                            
                            <View style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardHeaderText}>Upgrade your run</Text>
                                </View>
                                <View style={styles.cardBody}>
                                    <ScrollView style={{ padding: 5 }} horizontal showsHorizontalScrollIndicator={false}>                                        
                                        <ImageBackground 
                                            source={{ uri: 'https://media.self.com/photos/58d693e3d92aa7631e120f9d/4:3/w_2560%2Cc_limit/GettyImages-486273040.jpg' }}  style={styles.cardImage}>
                                            <Text style={styles.cardText}>Muscle Group</Text>
                                        </ImageBackground>
                                        <ImageBackground 
                                            source={{ uri: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }}  style={styles.cardImage}>
                                            <Text style={styles.cardText}>Muscle Group</Text>
                                        </ImageBackground>
                                        <ImageBackground 
                                            source={{ uri: 'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/322/322692/what-to-eat-after-a-workout.jpg?w=1155&h=1541' }}  style={styles.cardImage}>
                                            <Text style={styles.cardText}>Muscle Group</Text>
                                        </ImageBackground>
                                    </ScrollView>
                                </View>
                            </View>  */}
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
    }
})