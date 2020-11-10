import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, FlatList, Button } from 'react-native';
import {ListPicker} from '@react-native-picker/picker';

export default function App() {

  const [value, setValue] = useState(0);
  const [selectedCurrency, setSelectedCurrency]= useState(Object.keys(currencies[0]));
  const [currencies, setCurrencies] = useState([]);
  const [state, setState] = useState('');
  const [result, setResult] = useState(0);

React.useEffect(() => {
  fetch(`https://api.exchangeratesapi.io/latest`)
  .then(response => response.json())
  .then(data => {
    setCurrencies(data.rates);
  })
  .catch((error)=>{
    Alert.alert('Error', error);
  })
}, []);

const i=0;
  for (i; i<currencies.length; i++) {
  this.state = {
    currency: Object.keys(currencies[i])
  };
  };

const convert = () => {
    const result = parseInt(value)/currencies(state);
    setResult(result);
};

  return (
    <View style={styles.container}>
      <Text>{result}</Text>
      <TextInput style={styles.input}
        onChangeText={text => setValue(text)}
        value={value}
			/>
      <ListPicker
        ref={(picker)=>{ this.picker = picker; }}
        onChange={(value)=>this.setState({currency})}
        style={{height: 50, width: 100}}
        dataList={currencies}
      />
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