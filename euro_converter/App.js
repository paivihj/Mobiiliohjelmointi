import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, FlatList, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {
  const [value, setValue] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [keys, setKeys] = useState([]);
  const [result, setResult] = useState(0);

const getCurrencies = () => {
  fetch(`https://api.exchangeratesapi.io/latest`)
  .then(response => response.json())
  .then(data => {
    setCurrencies(data);
  })
  .catch((error)=>{
    Alert.alert('Error', error);
  })
};

state = {country: ''}
 (Object.keys(currencies));

const convert = () => {
    const result = value/currencies(itemValue);
    setResult(result);
};

  return (
    <View style={styles.container}>
      <Text>{result}</Text>
      <TextInput style={styles.input}
        onChangeText={text => setValue(text)}
        value={value}
			/>
      <Picker
        selectedValue={keys}
        style={{height: 50, width: 100}}>
      </Picker>
			<Button
				onPress={convert}
				title="CONVERT"
			/>
      </View>
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
    width: 100,
    margin: 2,
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