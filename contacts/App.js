import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {

  [contactList, setContactList] = useState([]);
  
  const getContacts = async() => {
    setContactList([]);

    const { status } = await Contacts.requestPermissionsAsync();
  
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      setContactList(data);
      console.log(contactList);
    
  }
}

  if (contactList.length>0){
  return (
    <View style={styles.container}>
    <View style={styles.list}>
    <FlatList
        data={contactList}
        keyExtractor={item => item.id}
        renderItem={({item}) => { try {
          return (
            <View>
              <Text>{item.name} {item.phoneNumbers[0].number}</Text>
            </View>)} catch {
              return (
                <View>
              <Text>{item.name}</Text>
            </View>)
            }
            }}
    />
    </View> 
    <Button
      onPress={getContacts}
      title="Get Contacts"
    />
    </View>
  );}

  else {
    return (
    <View style={styles.container}>
      <Button
      onPress={getContacts}
      title="Get Contacts"
      />
    </View>
  );}
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
