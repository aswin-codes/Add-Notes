import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, SafeAreaView, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import Note from './components/Note';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({ navigation }) {
  const [listOfNotes, setListOfNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const getData = async () => {
    
    const string = await AsyncStorage.getItem('data');
    setIsLoading(false);
    if (string != null) {
      const json = JSON.parse(string);
      setListOfNotes(json.notes);
    }
    
  }

  useEffect(() => {
    getData()
  });

  return (
    <SafeAreaView style={styles.body}>
  
        {/* <Note key={1} title={'Cook Food'} description={"Buy Maggi Packet from store. Put it in the bowl. Fill it with water. Heat the bowl for 2 mins. Your Maggi is Ready"} /> */}
        {
          ((isLoading == false) && (listOfNotes.length == 0)) ? 
          <View style={{height: 400, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color:'#000'}}>No Added Notes</Text>
          </View>
           :
           <FlatList
            data={listOfNotes}
            renderItem={({item}) => <Note id={item.id} navigation={navigation} description={item.description} title={item.title} key={item => item.id}/>}

           />
        }
      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={() => { navigation.navigate('AddNote') }}>
          <View style={styles.addButton}>
            <Text style={styles.buttonText}>Add</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    position: 'relative',
    backgroundColor: '#EEEEE'
  },
  addButton: {
    backgroundColor: 'red',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25.0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,

  },
  buttonText: {
    color: '#fff',
    fontSize: 15
  }
})