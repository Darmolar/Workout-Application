import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native'; 
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';
import Deck from './components/Deck';
import Buttons from './components/Button';
import Card from './components/Cards';

const { width, height } = Dimensions.get('window');

const DATA = [
    {
        id: 1,
        title: "Body Fitness Top",
        number: 30000
    },
    {
        id: 2,
        title: "Body Fitness Center",
        number: 30000
    },
    {
        id: 3,
        title: "Body Fitness Bottom",
        number: 30000
    }
];

export default class DashboardScreen extends Component {

  renderCard(item){
     return (
      <View key={item.id} style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={{ paddingHorizontal: 30, }}>
            <Text style={styles.title}>{item.title}</Text>
            <Icon 
                name="ios-remove"
                size={40}
                color={'black'}
                style={{marginTop: 25}}
                />
            <Text style={styles.number}>{item.number}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end', right: 10, justifyContent: 'center' }}> 
          <Text style={styles.metricText}>Metrics</Text>
        </View>
    </View>
     )
  } 

  renderNoMoreCard(){ 
    return (
      <View title="All Done"> 
          <Text style={styles.noCard}>No More Card Here</Text>
          <Buttons 
                backgroundColor="#FFF" 
                title="Get More" 
                color="#fff"
              />
      </View>
    )
  }

  render(){ 
    return (
        <View style={styles.container}> 
          <StatusBar style="auto" /> 
          {/* <View style={styles.col}> 
            <View>
              <Icon name="md-remove" color='#000' size={26}  />  
              <Icon name="md-remove" color='#000' size={26} style={styles.minusIcon} />  
            </View>
            <View style={styles.avartarContainer}>
              <Image
                  source={require('../assets/icon.png')}
                  style={styles.avatar}
              />
            </View>
          </View>  */}
          {/* <View style={styles.colContainer}>
              <Text style={styles.textGLobal}>GLOBAL</Text>
              <Text style={styles.textGLobal}>GLOBAL</Text>
              <Icon name="md-refresh" size={24} color="black" />
          </View> */}
          <Deck 
              data={DATA}
              renderCard={this.renderCard}
              renderNoMoreCard={this.renderNoMoreCard}
            />
          <ScrollView style={{marginTop: 10}}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      >
              <Card 
                  icon="ios-refresh"
                  title="Total Fitness"
                  bg="#FFF"
                  number="300"
              />
              <Card 
                  icon="ios-refresh"
                  title="Total Fitness"
                  bg="#fff"
                  number="300"
              />
              <Card 
                  icon="ios-refresh"
                  title="Total Fitness"
                  bg="#FFF"
                  number="300"
              />
              <Card 
                  icon="ios-refresh"
                  title="Total Fitness"
                  bg="#FFF"
                  number="300"
              />
          </ScrollView>
          <View style={{ bottom: 20 }}>
            <Buttons 
                name="Expore collections"
            />
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff', 
  }, 
  col:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 40,
    alignItems: 'center'
  },
  cardContainer:{
    height: 150,
    width: 250,
    marginLeft: 20,
    backgroundColor: "rgba(0, 0, 0, .08)",
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card:{
    height: 150,
    width: 200,
    paddingTop: 20, 
    backgroundColor: "rgba(0, 0, 0, .05)",
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  title:{
    color: '#000',
    width: 100,
    fontSize: 12,
    fontFamily: 'Raleway-Bold',
  },
  metricText:{
    color: '#000',
    transform:[{
      rotate: "-90deg",
    }],
    fontSize: 20,
    fontFamily: 'Raleway-Regular',
  },
  number:{
    color: '#000',
    width: 100,
    fontSize: 22,
    fontFamily: 'Raleway-Regular',
    marginTop: -10,
  }, 
  noCard:{
    marginBottom: 10,
    color: '#000',
    backgroundColor: '#000',
    alignSelf: 'center',
  },
  minusIcon:{
      marginTop: -20,
      marginLeft: 5,
  },
  avartarContainer: {
    width: '50%',
    alignItems: 'flex-end',
  },
  avatar:{
    width: 40,
    height: 40,borderRadius: 20,
  },
  colContainer:{
    flexDirection: 'row',
    paddingHorizontal: 30,
    marginTop: 40,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textGLobal:{
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: 'red',
  },

});
