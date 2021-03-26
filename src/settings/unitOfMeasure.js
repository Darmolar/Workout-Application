import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Switch } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function unitOfMeasureScreen({ navigation }){
    const [ selected, setSelected ] = useState(false);
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContainer}>
                    <Icon name="ios-return-up-back" size={30} color="black" onPress={() => navigation.goBack()} />
                    <Text style={styles.headerText}>Units of Measure</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyListContainer}> 
                    <TouchableOpacity style={styles.listContainer}>
                        <Text style={styles.listContainerText}>Imperial</Text>
                        <View style={styles.listContainerTextCon}>
                            <Text>ft, in, mi, ibc</Text>
                            <Switch thumbColor="black" value={selected}  onChange={() =>  setSelected(!selected)}  />
                        </View>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.listContainer}>
                        <Text style={styles.listContainerText}>Metric</Text> 
                        <View style={styles.listContainerTextCon}>
                            <Text>m, cm, khm, kg</Text>
                            <Switch thumbColor="black" value={selected}  onChange={() =>  setSelected(selected)}  />
                        </View>
                    </TouchableOpacity> 
                    <View style={[styles.listContainerTab, { padding: 20 }]}>  
                        <Text style={[styles.listContainerTabText, { padding: 10, fontSize: 14,opacity: 30, textAlign: 'center'  }]}>
                            Change your unit of measure affect the units displayed, in the app or content you share
                        </Text> 
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
    listContainerTextCon:{
        flexDirection: 'row',
        alignItems: 'center'
    }
});