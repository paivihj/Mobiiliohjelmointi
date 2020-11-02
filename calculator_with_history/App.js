import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput } from 'react-native';

export default function App() {
  const [result, setResult]=useState(0);
	const [firstNumber, setFirstNumber]=useState(0);
  const [secondNumber, setSecondNumber]=useState(0);
  
  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  const plusPressed = () => {
    setResult(parseInt(firstNumber)+parseInt(secondNumber));
    setText(String(firstNumber) + '+' + String(secondNumber) + '=' + String(parseInt(firstNumber)+parseInt(secondNumber)));
    setData([...data, { key: String(data.length), text: text}]);
    setFirstNumber(0);
    setSecondNumber(0);
  }


  const minusPressed = () => {
    const[n1, n2]=[Number(firstNumber), Number(secondNumber)];
    setResult(n1-n2);
    setText(String(n1) + '-' + String(n2) + '=' + String(n1-n2));
    setData([...data, {key: String(data.length), text:text}]);
    setFirstNumber(0);
    setSecondNumber(0);
  }
			
			return(
			<View style={styles.container}>
			<Text>Result: {result}</Text>
			<TextInput style={styles.input}
				keyboardType = 'number-pad'
				value={firstNumber}
				onChangeText={firstNumber => setFirstNumber(firstNumber)}
			/>
			<TextInput style={styles.input}
				keyboardType = 'number-pad'
				value={secondNumber}
				onChangeText={secondNumber => setSecondNumber(secondNumber)}
			/>
			<View style={styles.button}>
			<Button
				onPress={() => plusPressed()}
				title="  +  "
			/>
			<Button
				onPress={() => minusPressed()}
				title="   -   "
			/></View>
      <FlatList
      ListHeaderComponent={()=><Text style={{fontWeight:'bold'}}>History</Text>}
      data={data}
      renderItem={({item}) =>
          <Text>{item.text}</Text>}
          />
			</View>
			);
}

const styles = StyleSheet.create({
  container: {
    margin:40,
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
