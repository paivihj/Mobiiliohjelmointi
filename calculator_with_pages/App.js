import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { Button, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { NavigationContainer} from'@react-navigation/native';
import { createStackNavigator} from'@react-navigation/stack';

const Stack = createStackNavigator();

function Home({ navigation }){

  const [result, setResult]=useState(0);
	const [firstNumber, setFirstNumber]=useState(0);
  const [secondNumber, setSecondNumber]=useState(0);
  
  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  const initialFocus = useRef(null);

  const plusPressed = () => {
    let result=0;
    result=(parseInt(firstNumber)+parseInt(secondNumber));
    setResult(result);
    const text=`${firstNumber} + ${secondNumber} = ${result}`;
    setText(text);
    setData([...data, { key: String(data.length), text: text}]);
    setFirstNumber('');
    setSecondNumber('');
    initialFocus.current.focus();
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
    initialFocus.current.focus();
  }

  return(
    <View style={styles.container}>
    <Text>Result: {result}</Text>
    <TextInput style={styles.input} ref={initialFocus}
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
    />
    <Button
      onPress={()=>navigation.navigate('History', {data})}
      title="History"/>
    </View>
    </View>
    );
}

function History({ route, navigation }){
  const { data } = route.params;
  return (
    <View style={styles.container}>
    <FlatList
    ListHeaderComponent={()=><Text style={{fontWeight:'bold'}}>History</Text>}
    data={data}
    renderItem={({item}) =>
        <Text>{item.text}</Text>}
        />
    </View>
  )
}

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
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
