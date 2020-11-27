import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import { Header, Icon, Input, Button, ListItem } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

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

  return(
    <View style={styles.container}>
    <Header centerComponent={{ text: 'SHOPPING LIST', style: { color:'white'}}}
    backgroundColor='pink'/>
    <Input placeholder='Product' label='PRODUCT' 
        onChangeText={(title) => setTitle(title)}
        value={title}/>  
      <Input placeholder='Amount' label='AMOUNT' 
        onChangeText={(amount) => setAmount(amount)}
        value={amount}/>      
        <Button raised icon={{name: 'save', color:'white', }} onPress={saveItem} title=" Save" /> 
      <View style={styles.child}> 
      <FlatList style={{width: 150}}
        keyExtractor={item => item.id.toString()} 
        data={list} 
        renderItem={({ item }) => (
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title><Text>{item.product}</Text></ListItem.Title>
            <ListItem.Subtitle><Text>{item.amount}</Text></ListItem.Subtitle>
            <Icon type='material' name='delete' color='red' onPress={() => deleteItem(item.id)}/> 
          </ListItem.Content>
        </ListItem>)}
      />      
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginTop: 0,
    flex: 1,
    fontFamily: 'Comic Sans, Calibri',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  child: {
    margin: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 18,
    padding: 3,
  },
  input:{
    width: 200,
    margin:5,
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "#fff"
   },
});
