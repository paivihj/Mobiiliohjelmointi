import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PlayScreen from './PlayScreen';
import HighScores from './HighScores';
import { Button, Overlay, Text, Header } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import { Camera } from'expo-camera';

const Tab = createBottomTabNavigator();

export default function App() { 
    
    return (
    <NavigationContainer>
     <Tab.Navigator tabBarOptions={{activeTintColor:'black', labelStyle: {fontSize:15, marginBottom:15} }}>
       <Tab.Screen name="Play" component={PlayScreen}/>
       <Tab.Screen name="High Scores" component={HighScores}/>
     </Tab.Navigator>
  
   </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
