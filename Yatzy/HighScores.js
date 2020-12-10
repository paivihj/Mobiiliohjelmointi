import React, { useState, useEffect } from'react';
import{ View, Text, StyleSheet, FlatList } from'react-native';
import Firebase from './firebase';

export default function HighScores() {

const [name, setName] = useState('');
const [points, setPoints] = useState(0);
const [results, setResults] =useState([]);

useEffect(() => {
  Firebase.database().ref('scores/').on('value', snapshot => {
    const data = snapshot.val();
    const prods= data ? Object.keys(data).map(key=> ({key, ...data[key]})) : [];
    setResults(prods);
    console.log(prods);
  });
}, []);

    return(
    <View style={styles.container}>
        <FlatList
          ListHeaderComponent={()=><Text style={{fontWeight:'bold'}}>High Scores</Text>}
          data={results.sort(function(a, b){
            return (parseInt(b.points)-parseInt(a.points))
          })
          }
          renderItem={({item}) =>
            <Text> {item.name} {item.points}</Text>}
          />
    </View >
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });