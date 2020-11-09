import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, FlatList, Button } from 'react-native';

export default function App() {

const[word, setWord]=useState('');
const [recipes, setRecipes] = useState([]);

const getRecipes = () => {
  fetch(`http://www.recipepuppy.com/api/?=${word}`)
  .then(response => response.json()) 
  .then(data => {
    setRecipes(data);})
    .catch((error)=>{
      Alert.alert('Error', error);
  });
}

  return (
    <View style={styles.container}>
      <FlatList
      keyExtractor={item => item.results.href}
      renderItem={({item}) => <Text>{item.results.title} <br></br> {item.results.thumbnail}</Text>}
      data={recipes}
    />
      <TextInput style={styles.input}
        placeholder="Ingredient"
        onChangeText={text => setWord(text)}
        value={word}
			/>
			<Button
				onPress={getRecipes}
				title=" FIND "
			/>
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
