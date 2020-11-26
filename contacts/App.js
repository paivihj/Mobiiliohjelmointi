import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [contact, setContact] = useState({id: '', name:'', number:''});
  //const [contactList, setContactList] = useState([]);
  
  const getContacts = async() => {
    //setContactList([]);

    const { status } = await Contacts.requestPermissionsAsync();
  
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      
    if (data.length>0) {
      var i = 150;
      //for (var i = 0; i<data.length; i++){
        try {
          setContact({id: data[i].lookupKey, name: data[i].name, number: data[i].phoneNumbers[0].number});
        } catch(err) {
          setContact({id: data[i].lookupKey, name: data[i].name, number: ''});
        };
    //}
  }
  }
  console.log(contact);
}
  
  return (
    <View style={styles.container}>
    <Text>{contact.name} {contact.number}</Text>
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
