import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard, Dimensions } from 'react-native';
import MapView, { Marker} from 'react-native-maps';

export default function App() {

  const [address, setAddress] = React.useState('');
  const [coordinates, setCoordinates] = React.useState({latitude: 60.201373, longitude: 24.934041});
  const [region, setRegion] = React.useState({
                              latitude: 60.200692,
                              longitude: 24.934302,
                              latitudeDelta: 0.0322,
                              longitudeDelta: 0.0221});

  const getCoordinates = () => {
    const url = `http://www.mapquestapi.com/geocoding/v1/address?key=7sCnijZS59uTJITuAwzMXFadM8VTRAHF&location=${address}`;
    fetch(url)
    .then((response) => response.json()) 
    .then((data) => {
      setRegion({...region, latitude: (coordinates.latitude-0.002), longitude: (coordinates.longitude+0.0006)});
      setCoordinates({latitude: data.results[0].locations[0].latLng.lat, longitude: data.results[0].locations[0].latLng.lng});
    })
    .catch((error)=>{
        Alert.alert('Error', error);
    });
  }

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        initialRegion={region}
        region={region}
      >
        <Marker 
          coordinate={coordinates}
          title='Haaga-Helia'
        />
      </MapView>
      <View style={styles.input}>
        <TextInput 
          keyboardType="default"
          placeholder="Write address"
          onChangeText={(text) => setAddress(text)}
          value={address}
        />
        <Button
          onPress={getCoordinates}
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
   }
});
