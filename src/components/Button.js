import React, { Component } from 'react';
import { 
        View, 
        Text ,
        StyleSheet,
        Button
    } from 'react-native';


export default class Buttons extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.circle}>
                    <Text style={styles.textInfo}>i</Text>
                </View>
                <Text style={styles.btnName}>{ this.props.name }</Text> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        borderRadius: 15,
        borderColor: "#6a706e",
        borderWidth: 0.3,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    circle:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    textInfo:{
        color: 'rgba(0,0,0,0.7)',
        fontFamily: 'Raleway-Regular',
    },
    btnName:{
        fontFamily: 'Raleway-Bold',
        color: '#000',
        fontSize: 12,
        marginLeft: 20,
    },
})