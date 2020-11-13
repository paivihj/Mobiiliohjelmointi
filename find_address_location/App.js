import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import MapView, { Marker} from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {

  const [isReady, setReady] = React.useState(false);
  const [address, setAddress] = React.useState('');
  const [coordinates, setCoordinates] = React.useState({latitude: 0, longitude: 0});
  const [region, setRegion] = React.useState({
                              latitude: 0,
                              longitude: 0,
                              latitudeDelta: 0.0322,
                              longitudeDelta: 0.0221});

  useEffect(()=>{
    getLocation();
    console.log(coordinates);
    setReady(true);
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted'){
      Alert.alert('No permission to location');
    }
    else {
      let currentlocation = await Location.getCurrentPositionAsync({});
      setCoordinates({latitude: currentlocation.coords.latitude, longitude: currentlocation.coords.longitude});
      setRegion({...region, latitude: (currentlocation.coords.latitude-0.002), longitude: (currentlocation.coords.longitude+0.0006)});
    }
  };
    
  const getCoordinates = () => {
    const url = `http://www.mapquestapi.com/geocoding/v1/address?key=&location=${address}`;
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

  if (isReady==false) {
    return (
      <View style={styles.container}><Text>Loading...</Text></View>
    )
  }
  else {
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

