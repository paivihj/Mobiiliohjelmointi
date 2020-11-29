import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, FlatList } from 'react-native';
import MapView, { Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import { NavigationContainer} from'@react-navigation/native';
import { createStackNavigator} from'@react-navigation/stack';
import { Header, Icon, Input, Button, ListItem } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

const Stack = createStackNavigator();
const db = SQLite.openDatabase('myplaces.db');

export default function App() {

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="My Places" component={Home} />
        <Stack.Screen name="Map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );			
}

function Home({ navigation }){

  const [text, setText] = useState('');
  const [data, setData] = useState([]);
  const [isReady, setReady] = React.useState(false);
  const [address, setAddress] = React.useState('');
  const [coordinates, setCoordinates] = React.useState({latitude: 0, longitude: 0});

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists places (id integer primary key not null, address text);');
    });
    updateList();    
  }, []);

  const buttonPressed = () => {
    db.transaction(tx => {
      tx.executeSql('insert into places (address) values (?);', [text]);    
    }, null, updateList
  )
  setText('');
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from places;', [], (_, { rows }) =>
        setData(rows._array)
      ); 
    });
  }

  const getCoordinates = (address) => {
    const url = `http://www.mapquestapi.com/geocoding/v1/address?key=7sCnijZS59uTJITuAwzMXFadM8VTRAHF&location=${address}`;
    fetch(url)
    .then((response) => response.json()) 
    .then((data) => {
      setCoordinates({latitude: data.results[0].locations[0].latLng.lat, longitude: data.results[0].locations[0].latLng.lng});
    })
    .catch((error)=>{
        Alert.alert('Error', error);
    });
    navigation.navigate('Map', {coordinates})
  }

  const deleteAddress = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from places where id = ?;`, [id]);
      }, null, updateList
    )    
  }

  return(
    <View style={styles.container}>
    <Input placeholder='Type address' label='PLACEFINDER' 
      onChangeText={text => setText(text)}
      value={text}
    />
    <Button raised icon={{name: 'save', color:'white', }} buttonStyle={{backgroundColor: 'grey', width:'100%'}}
      onPress={() => buttonPressed()}
      title=" SAVE                          "
    />
    <FlatList style={styles.list}
        keyExtractor={item => item.id.toString()} 
        data={data} 
        renderItem={({ item }) => (
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{item.address}</ListItem.Title>
          </ListItem.Content>
          <Text style={{color:'lightgrey'}}>Show on map</Text><Icon type='material' name='keyboard-arrow-right' color='lightgrey' 
          onPress={()=>getCoordinates(item.address)}
          onLongPress={()=>deleteAddress(item.id)}/>
        </ListItem>
        )}
      />    
    </View>
    );
}

function Map({ route, navigation }){
  const { coordinates } = route.params;
  const [region, setRegion] = React.useState({
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221});

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        region={region}
      >
        <Marker 
          coordinate={coordinates}
        />
      </MapView>
      <View style={styles.input}>
        <Button
          title=" SHOW "/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    flex: 1,
    alignItems: 'center',
    width: 500,
    margin: 2,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "#fff"
   },
   map: {
    flex: 9,
    width: '100%',
    height: '100%'
   },
   list: {
    fontSize: 18,
    padding: 3,
    width: '100%',
  },
});
