import { StatusBar } from 'expo-status-bar';
import React, {useState , useEffect} from "react";  
import { useWindowDimensions, StyleSheet, View, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { EvilIcons, Ionicons, AntDesign, Octicons, MaterialCommunityIcons, Feather, MaterialIcons, FontAwesome, Entypo, Fontisto } from '@expo/vector-icons';   
import { 
        Drawer, 
        Avatar, 
        Title,
        Caption,
        Paragraph,
        Text,
        TouchableRipple,
        Switch, 
    } from 'react-native-paper'; 
import Icon from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
 

export function DrawerContents({props, navigation}, ){
    const [isSwitchOn, setIsSwitchOn] = React.useState(false); 
    const [ token, setToken ] = useState('');
    const [ userDetails, setUserDetails ] = useState({});  
    const [ loading, setLoading ] = useState(false);  

    useEffect(() => {
       getUserDetails(); 
    },[])
 
    const getUserDetails = async () => {
        setLoading(true);
        var token = await AsyncStorage.getItem('token');
        var userDetails = await AsyncStorage.getItem('userDetails');
        if(token !== null && userDetails !== null){ 
            setToken(JSON.parse(token));  
            var data = JSON.parse(userDetails); 
            setUserDetails(data);
             
            return true;
        }else{
            navigation.navigate('Login');
        }  
        return false
    }

    const logout = async () => {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('userDetails') 
            navigation.navigate('Login'); 
    } 

    return (
        <View style={{ flex: 1 }}> 
            <StatusBar style="light" backgroundColor="#243972" />
            <DrawerContentScrollView {...props}>
                <View style={styles.container}>
                    <View style={styles.containerHead}> 
                        <View style={styles.profileContainer}>
                            <Avatar.Image 
                                source={{ uri: 'https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg' }}
                                size={70}
                                style={{ borderWidth: 15, borderColor: '#fff', justifyContent: 'center', alignItems: 'center' }}
                            />
                            {/* <Avatar.Text  
                                label="AM"
                                size={100}
                                style={{ borderWidth: 2, borderColor: '#fff', backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }}
                            /> */}
                            <Text style={styles.title}>{userDetails.first_name } {userDetails.last_name }</Text> 
                        </View>
                    </View>
                    <View style={styles.containerBody}>
                        <Drawer.Section> 
                            <DrawerItem
                               icon={({color, size}) => (
                                    <Icon 
                                        name="ios-stopwatch-outline" 
                                        size={size} color={color}
                                    />
                               )}  
                               label={"Workouts"}
                               activeTintColor={'#000'}
                               inactiveTintColor={'grey'}
                               labelStyle={styles.tintText} 
                               onPress={() => navigation.navigate('Dashboard')} 
                               style={styles.tintView}
                            />   
                            <DrawerItem
                               icon={({color, size}) => (
                                    <Icon 
                                        name="ios-save-outline" 
                                        size={size} color={color}
                                    />
                               )}  
                               label={"Saved Works"}
                               activeTintColor={'#000'}
                               inactiveTintColor={'grey'}
                               labelStyle={styles.tintText}
                               onPress={() => navigation.navigate('Saved')}
                               style={styles.tintView}
                            />   
                            <DrawerItem
                               icon={({color, size}) => (
                                    <Icon 
                                        name="ios-stats-chart-outline" 
                                        size={size} color={color}
                                    />
                               )}  
                               label={"Activities"}
                               activeTintColor={'#000'}
                               inactiveTintColor={'grey'}
                               labelStyle={styles.tintText}
                               onPress={() =>  navigation.navigate('Activity')}
                               style={styles.tintView}
                            />  
                            {/* <DrawerItem
                               icon={({color, size}) => (
                                    <Icon 
                                        name="content-save-move-outline" 
                                        size={size} color={color}
                                    />
                               )}  
                               label={"Feeds"}
                               activeTintColor={'#000'}
                               inactiveTintColor={'grey'}
                               labelStyle={styles.tintText}
                               onPress={() => console.log('hello')}
                               style={styles.tintView}
                            />  
                            <DrawerItem
                               icon={({color, size}) => (
                                    <Icon 
                                        name="content-save-move-outline" 
                                        size={size} color={color}
                                    />
                               )}  
                               label={"Inbox"}
                               activeTintColor={'#000'}
                               inactiveTintColor={'grey'}
                               labelStyle={styles.tintText}
                               onPress={() => console.log('hello')}
                               style={styles.tintView}
                            />   */}
                            <DrawerItem
                               icon={({color, size}) => (
                                    <Icon 
                                        name="ios-settings-outline" 
                                        size={size} color={color}
                                    />
                               )}  
                               label={"Settings"}
                               activeTintColor={'#000'}
                               inactiveTintColor={'grey'}
                               labelStyle={styles.tintText}
                               onPress={() => navigation.navigate('Settings') }
                               style={styles.tintView}
                            />  
                            <DrawerItem
                               icon={({color, size}) => (
                                    <Icon 
                                        name="exit-outline" 
                                        size={size} color={color}
                                    />
                               )}  
                               label={"Logout"}
                               activeTintColor={'#000'}
                               inactiveTintColor={'grey'}
                               labelStyle={styles.tintText}
                               onPress={logout }
                               style={styles.tintView}
                            />  
                        </Drawer.Section>
                    </View>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section>
                <TouchableRipple>
                    <View style={styles.preferences}>
                        <Text style={{ fontSize: 16, left: 10, fontFamily: 'Raleway-Light', }}>Dark Theme</Text>
                        <View pointerEvents={'none'}>
                            <Switch value={isSwitchOn} />
                        </View>
                    </View>
                </TouchableRipple>
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        // backgroundColor: '#FFF',
    },
    containerHead:{
        flex: 1
    },
    profileContainer:{
        width: '100%',
        height: 200,
        justifyContent: 'center',
        paddingLeft: 20,
        // alignItems: 'center'
    },
    title:{
        color: '#000',
        fontSize: 13,
        fontFamily: 'Raleway-Bold',
        marginTop: 20
    }, 
    containerBody:{ 
        flex: 2,
        width: '100%',
        color: '#000',
        height: 700,
        padding: 10,
        borderTopWidth: 0.6,
        // backgroundColor: '#FFF',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    tintText:{
        fontSize: 14,
        fontFamily: 'Raleway-Bold',
    },
    tintView:{
        height: 40, 
    },
    preferences:{ 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
    }
})