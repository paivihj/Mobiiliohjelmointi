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
    let result=0;
    result=(parseInt(firstNumber)+parseInt(secondNumber));
    setResult(result);
    const text=`${firstNumber} + ${secondNumber} = ${result}`;
    setText(text);
    setData([...data, { key: String(data.length), text: text}]);
    setFirstNumber('');
    setSecondNumber('');
  }


  const minusPressed = () => {
    let result=0;
    result=(parseInt(firstNumber)-parseInt(secondNumber));
    setResult(result);
    const text=`${firstNumber} - ${secondNumber} = ${result}`;
    setText(text);
    setData([...data, { key: String(data.length), text: text}]);
    setFirstNumber('');
    setSecondNumber('');
  }
			
			return(
			<View style={styles.container}>
			<Text>Result: {result}</Text>
			<TextInput style={styles.input}
        keyboardType = 'number-pad'
        onChangeText={text => setFirstNumber(text)}
				value={firstNumber}
			/>
			<TextInput style={styles.input}
				keyboardType = 'number-pad'
        onChangeText={text => setSecondNumber(text)}
        value={secondNumber}
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
