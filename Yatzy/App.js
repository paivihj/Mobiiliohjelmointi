import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PlayScreen from './PlayScreen';
import HighScores from './HighScores';
import { Button, Overlay, Text, Header } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import { Camera } from'expo-camera';

const Tab = createBottomTabNavigator();

export default function App() {
    const [visible, setVisible] = useState(true);

    const [hasCameraPermission, setPermission] = useState(null);
    const[photoName, setPhotoName] = useState('');
    const [type, setType] = useState(Camera.Constants.Type.front);
    const camera= useRef(null);  

    useEffect(() =>{
      askCamera();
    }, []);

    const askCamera = async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setPermission(status=='granted');
    }

    const snap = async () => {
      console.log('Taking photo');
      if (camera) {
        const photo = await camera.current.takePictureAsync({base: true});
        console.log(photo);
        setPhotoName(photo.uri);
        //this.props.navigation.navigate("Play", { data: photoName })
        setVisible(false);
      }
    };

    const setCamera = () => {
      if (type == Camera.Constants.Type.front){
        setType(Camera.Constants.Type.back);
      } else {
        setType(Camera.Constants.Type.front);
      }
    }

    if (visible) {
  return (
    <View style={styles.container}>
    <Overlay isVisible={visible}>
      <Text style={{ fontSize:20, fontWeight:'bold' }}>
        Welcome to Yatzy!</Text>
      <Text>Take a photo of the player to enter the result table.</Text>
    { hasCameraPermission ?
    (
      <View style={{ flex:1 }}>
        <Camera type={type} onPress={setCamera} 
                style={{ flex:3, margin:20, width:250 }} ref={camera}
        />
      <View style={{ flex: 2 }}>
       <Button title="Change Camera" onPress={setCamera}/>
       <Button title="Take Photo" onPress={snap} />
      </View>
      </View>
     ) : (
      <Text>No access to camera</Text>
      )}
    </Overlay>
   </View>
  );}

  else if (!visible){
    return (
    <NavigationContainer>
     <Tab.Navigator>
       <Tab.Screen name="Play" component={PlayScreen}/>
       <Tab.Screen name="Scores" component={HighScores}/>
     </Tab.Navigator>
   </NavigationContainer>
    );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
