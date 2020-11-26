import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';
import Constants from 'expo-constants';

export default function App() {

  const[text, setText] = useState('');

  const buttonPressed = () => {
    Speech.speak(text);
  }

  return (
    <View style={styles.container}>  
    <TextInput style={styles.input}
      value={text}
      onChangeText={text => setText(text)}
    />
     <View><Button
      onPress={buttonPressed}
      title="Paina kuullaksesi teksti"
    />
    </View></View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    width: 250,
    margin:5,
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "#fff"
   },
});
