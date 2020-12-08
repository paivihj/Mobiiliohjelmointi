import React from'react';
import{ View, Text, StyleSheet} from'react-native';

export default function HighScores() {
    return(
    <View style={styles.container}>
        <Text>High Scores will be shown here</Text>
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