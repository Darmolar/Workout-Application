import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Switch } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function aboutYouScreen({ navigation }){
    const [ selected, setSelected ] = useState(false);
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContainer}>
                    <Icon name="ios-return-up-back" size={30} color="black" onPress={() => navigation.goBack()} />
                    <Text style={styles.headerText}>Mobile</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyListContainer}>
                    <View style={[styles.listContainerTab, { padding: 30 }]}>  
                        <Text style={styles.listContainerTabText}>We'd like this information to provide 
                        more aqurate results, such as run distance, pace and calories. 
                        <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Learn More</Text> </Text>
                    </View> 
                    <TouchableOpacity style={styles.listContainer}>
                        <Text style={styles.listContainerText}>Gender</Text>
                        <Text style={[styles.listContainerText, { fontSize: 14 }]}>Male</Text>
                    </TouchableOpacity>
                    <View style={styles.listContainerTab}>  
                    </View> 
                    <TouchableOpacity style={styles.listContainer}>
                        <Text style={styles.listContainerText}>Height</Text> 
                        <Text style={[styles.listContainerText, { fontSize: 14 }]}>edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listContainer}>
                        <Text style={styles.listContainerText}>Weight</Text> 
                        <Text style={[styles.listContainerText, { fontSize: 14 }]}>edit</Text>
                    </TouchableOpacity> 
                    <View style={[styles.listContainerTab, { padding: 20 }]}> 
                        <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
                            <Switch thumbColor="black" value={selected}  onChange={() =>  setSelected(!selected)}  />   
                            <Text style={styles.listContainerTabText}>Use default height and width</Text>                         
                        </View> 
                        <Text style={[styles.listContainerTabText, { padding: 10, fontSize: 13,opacity: 30 }]}>*if you don't wish to enter your height and weight, select the "use default"
                        option and we will use a default value to perform these these calculation </Text> 
                    </View> 
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
        fontSize: 16,
        fontFamily: 'Raleway-Regular', 
    },
});