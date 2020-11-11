import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Button, Image } from 'react-native';
import Hyperlink from 'react-native-hyperlink';

export default function App() {

const[word, setWord]=useState('');
const [recipes, setRecipes] = useState([]);

const getRecipes = () => {
  const url = `http://www.recipepuppy.com/api/?=${word}`;
  fetch(url)
  .then((response) => response.json()) 
  .then((data) => {
    setRecipes(data.results);})
}

  return (
    <View style={styles.container}>
      <FlatList style={{marginTop:30}}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item}) => {
          return(
            <View>
              <Text>{item.title}</Text>
              <Image
                style={{width:50, height:50}}
                source={{uri: `${item.thumbnail}`}}/>
            </View>
            );
          }}
        data={recipes}
      />
      <View>
        <TextInput style={styles.input}
          value={word}
          placeholder="Ingredient"
          onChangeText={(text) => setWord(text)}
			  />
			<Button
				onPress={getRecipes}
				title=" FIND "/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    width: 100,
    margin: 2,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "#fff"
   },
   button:{
    margin: 0,
      flex: 2,
      flexDirection: 'row',
      alignItems: 'flex-start',
     }
});
