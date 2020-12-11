import React  from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PlayScreen from './PlayScreen';
import HighScores from './HighScores';

const Tab = createBottomTabNavigator();

export default function App() { 
      
    return (
    <NavigationContainer>
     <Tab.Navigator tabBarOptions={{activeTintColor:'black', inactiveTintColor:'lightgrey', labelStyle: {fontSize:15, marginBottom:15}, keyboardHidesTabBar:true }}>
       <Tab.Screen name="Play" component={PlayScreen}/>
       <Tab.Screen name="High Scores" component={HighScores}/>
     </Tab.Navigator>
   </NavigationContainer>
    );
}

