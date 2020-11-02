import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Keyboard, TextInput, StyleSheet, Text, View, Button } from 'react-native';

export default function App() {		
	
	const [result, setResult]=useState(0);
	const [firstNumber, setFirstNumber]=useState(0);
	const [secondNumber, setSecondNumber]=useState(0);
			
			return(
			<View style={styles.container}>
			<Text>Result: {result}</Text>
			<TextInput style={styles.input}
				keyboardType = 'numeric'
				value={firstNumber}
				onChangeText={firstNumber => setFirstNumber(firstNumber)}
			/>
			<TextInput style={styles.input}
				keyboardType = 'numeric'
				value={secondNumber}
				onChangeText={secondNumber => setSecondNumber(secondNumber)}
			/>
			<View style={styles.button}>
			<Button 
				onPress={ result => setResult(parseInt(firstNumber)+parseInt(secondNumber)) }
				title="+"
			/>
			<Button
				onPress={ result => setResult(firstNumber-secondNumber) }
				title="-"
			/></View>
			</View>
			);
}

const styles = StyleSheet.create({
  container: {
	margin: 40,
	flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
	width: 75,
    margin:3,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "#fff"
   },
   button:{
	margin: 0,
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
   }
});


