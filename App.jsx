// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/home';
import AddNote from './screens/AddNote';
import Edit from './screens/Edit';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} 
        options={{ 
          title: "Notes App", 
          headerTitleAlign: 'center', 
          headerStyle: { backgroundColor: 'red' },
          headerTitleStyle: {color: '#fff'}
        }} />
        <Stack.Screen name="AddNote" component={AddNote} 
        options={{ 
          title: "Add Note",  
          headerTitleStyle: {color: '#000'}
        }}        
        />
        <Stack.Screen name="EditNote" component={Edit} 
        options={{ 
          title: "Edit Note",  
          headerTitleStyle: {color: '#000'}
        }}        
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;