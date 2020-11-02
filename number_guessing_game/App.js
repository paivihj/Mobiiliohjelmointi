import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Alert, TextInput, Button, Text, View } from 'react-native';

var number = Math.floor(Math .random() * 100) + 1;
var times = -1;

export default function App() {

  const [value, setValue] = useState(0);
  const [guess, setGuess] = useState(0);

if (guess==value){
  times++;
}

if (guess == 0){
  return (<View style={styles.container}>
    <Text>Guess a number between 1-100</Text>
    <TextInput style={styles.input}
      keyboardType = 'numeric'
      value={value}
      onChangeText={value => setValue(value)}
    />
    <Button 
      onPress={guess => setGuess(value)}
      title="Make a Guess!"
      />
  </View>)
}

if (guess > number){
  return(<View style={styles.container}>
      <Text>Your guess {guess} is too high</Text>
      <TextInput style={styles.input}
      keyboardType = 'numeric'
      value={value}
      onChangeText={value => setValue(value)}
    />
    <Button 
      onPress={guess => setGuess(value)}
      title="Make a Guess!"
      />
    </View>)
}

if (guess < number){
  return(  
    <View style={styles.container}>
    <Text>Your guess {guess} is too low</Text>
    <TextInput style={styles.input}
      keyboardType = 'numeric'
      value={value}
      onChangeText={value => setValue(value)}
    />
    <Button 
      onPress={guess => setGuess(value)}
      title="Make a Guess!"
      />
  </View>
  )
}
else if (guess==number){
  return(Alert.alert("You guessed the number " + number + " in " + times + " guesses"))
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial',
  },
   input:{
    margin:20,
    padding: 5,
    width: 40,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "#fff"
   },
});
