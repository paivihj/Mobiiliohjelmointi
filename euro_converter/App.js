import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {

  const [value, setValue] = useState('');
  const [selectedCurrency, setSelectedCurrency]= useState('');
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState(0);
  const [currencyList, setCurrencyList] = useState([]);
  const [factor, setFactor] = useState(1);

React.useEffect(() => {
  fetch(`https://api.exchangeratesapi.io/latest`)
  .then(response => response.json())
  .then(data => {
    console.log(data.rates);
    setCurrencies(data.rates);
    setCurrencyList(Object.keys(data.rates));
  })  
}, []);

const convert = () => {
    switch(selectedCurrency){
      case "CAD":
        setFactor(currencies.CAD);
      break;
      case "HKD":
        setFactor(currencies.HKD);
      break;
      case "GBP":
        setFactor(currencies.GBP);
    }
    const convertedresult = parseFloat(value)/factor;
    setResult(convertedresult.toFixed(2));
};

  return (
    <View style={styles.container}>
      <Text style={{fontSize:20, marginBottom:20}}>{result} €</Text>
      <View style={{flexDirection: 'row'}}>
      <TextInput style={styles.input}
        onChangeText={text => setValue(text)}
        value={value}
			/>
      <Picker
        selectedValue={selectedCurrency}
        style={{height: 50, width: 100}}
        onValueChange={(itemValue, itemIndex)=>setSelectedCurrency(itemValue)}>
        {currencyList.map(currency =>
          (
            <Picker.Item label={currency} value={currency} key={currency}/>
          ))}
      </Picker>
      </View>
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
    fontSize:17,
    width: 80,
    margin: 2,
    paddingLeft: 10,
    borderBottomWidth: 1,
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