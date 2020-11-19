import * as SQLite from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

const db = SQLite.openDatabase('shoppingdb.db');

export default function App() {
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shopping_list (id integer primary key not null, amount text, product text);');
    });
    updateList();    
  }, []);

  // Save item
  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into shopping_list (amount, product) values (?, ?);', [amount, title]);    
      }, null, updateList
    )
    setAmount('');
    setTitle('');
  }

  // Update shoppinglist
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shopping_list;', [], (_, { rows }) =>
        setList(rows._array)
      ); 
    });
  }

  // Delete item
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from shopping_list where id = ?;`, [id]);
      }, null, updateList
    )    
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder='Product' style={styles.input}
        onChangeText={(title) => setTitle(title)}
        value={title}/>  
      <TextInput placeholder='Amount' style={styles.input}
        onChangeText={(amount) => setAmount(amount)}
        value={amount}/>      
      <View style={styles.child}>
        <Button onPress={saveItem} title="Save" /> 
      </View>
      <Text style={{ fontSize: 20, color: 'blue', fontWeight: 'bold'}}>Shopping List</Text>
      <FlatList style={{marginTop: 5}}
        keyExtractor={item => item.id.toString()} 
        renderItem={({item}) => <View style={styles.list}><Text style={{fontSize:16}}>{item.product}, {item.amount}</Text>
        <Text style={{marginLeft: 8, color: 'red'}} onPress={() => deleteItem(item.id)}>Delete</Text></View>} 
        data={list} 
      />      
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
    marginTop: 15,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: 50,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 18,
    padding: 3,
  },
  input:{
    width: 160,
    marginTop: 10,
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "#fff"
   },
});
