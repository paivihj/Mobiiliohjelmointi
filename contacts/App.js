import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [contact, setContact] = useState({id: '', name:'', number:''});
  const [contactList, setContactList] = useState([]);
  
  const getContacts = async() => {
    setContactList([]);

    const { status } = await Contacts.requestPermissionsAsync();
  
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      
    if (data.length>0) {
      for (var i = 0; i<data.length; i++){
        try {
          setContactList([...contactList, {id: data[i].lookupKey, name: data[i].name, number: data[i].phoneNumbers[0].number}]);
          //const newList = contactList.concat({contact});
        } catch(err) {
          setContactList([...contactList, {id: data[i].lookupKey, name: data[i].name, number: ''}]);
        };
    }
    //setContactList([...contactList, {name: data[50].name, number: data[50].phoneNumbers[0].number}]);
    //setContactList([...contactList, {name: data[10].name, number: data[10].phoneNumbers[0].number}]);
    //console.log(contact);
  }
  }
  console.log(contactList);
}
  
  return (
    <View style={styles.container}>
    <View style={styles.list}>
    <FlatList
        data={contactList}
        keyExtractor={item => item.id}
        renderItem={({item}) => { 
            <View>
              <Text>{item.name} {item.number}</Text>
            </View>}}
    />
    </View> 
    <Button
      onPress={getContacts}
      title="Get Contacts"
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    alignItems: 'center',
    margin: 40,
    flex: 2,
  },
});
