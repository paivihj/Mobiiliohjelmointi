import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function App() {

  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  const buttonPressed = () => {
    setData([...data, {key: text}]);
    setText('');
  }

  const clear = () => {
    setData([]);
  }

  return(
    <View style={{flex:1, alignItems: 'center', keyboardShouldPersistTaps:'handled'}}>
    <View style={styles.container}>  
    <TextInput style={styles.input}
      value={text}
      onChangeText={text => setText(text)}
    />
     <View style={styles.child}><Button style={styles.button}
      onPress={buttonPressed}
      title="Add"
    />
    <Button style={styles.button}
      onPress={clear}
      title="Clear"
    /></View></View> 
    <View style={styles.list}>
    <Text style={{color:'blue', fontSize: 17, fontWeight: 'bold'}}>Shopping List</Text>
    <FlatList
      data={data}
      renderItem={({item}) =>
          <Text>{item.key}</Text>}
          />
          </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginTop: 50,
    flex: 1,
    fontFamily: 'Comic Sans, Calibri',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  child: {
    margin: 0,
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  button: {
    marginBottom:0,
    alignContent:'space-between'
  },
  list: {
    alignItems: 'center',
    margin: 15,
    flex: 2,
  },
  input:{
    width: 200,
    margin:30,
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "#fff"
   },
});
