import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
 } from 'react-native';
import Icon2 from '@expo/vector-icons/MaterialCommunityIcons';
import Icon from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class Card extends Component{
    render(){
        return(
            <View style={{
                        ...styles.container,
                        backgroundColor: this.props.bg
                    }}>
                <View style={styles.col}>
                    <Icon 
                        name={this.props.icon}
                        size={30}
                        color={this.props.bg == "red" ? "#fff" : "red"}
                        />
                    <TouchableOpacity onPress={this.props.Onpress}>
                        <Icon2
                            style={{marginLeft: 50}}
                            name="dots-vertical"
                            size={30}
                            color="#b8b8aa"
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.title}>{ this.props.title }</Text>
                    <Text style={{
                            ...styles.number,
                            color: '#000',
                            marginTop: 5,
                        }}>
                            { this.props.number }
                    </Text>
                </View>
            </View>
        )
    }
}
  
const styles = StyleSheet.create({
    container:{
        height: 160,
        width: 130,
        borderRadius: 30,
        padding: 15,
        marginLeft: 20,
        elevation: 3,
        justifyContent: 'space-between',
    },
    col:{
        flexDirection: 'row',
    },
    title:{ 
        color: '#b8b8aa',
        fontFamily: 'Raleway-Bold',
        fontSize: 12,
    },
    number:{
        fontFamily: 'Raleway-Regular',
        fontSize: 20
    },
})