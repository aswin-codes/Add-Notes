import { View, Text, StyleSheet, TextInput, Platform, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddNote = ({navigation}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function getRandomNumber() {
        //Used for generating ID for notes
        const timestamp = new Date().getTime(); 7
        const random = Math.floor(Math.random() * timestamp); 7
        return random;
      }
      
    const addNote = async () => {
        console.log(title, description);
        const data = await AsyncStorage.getItem('data');
        if (data == null) {
            const json = {
                notes: [
                    {
                        id: getRandomNumber(),
                        title: title,
                        description: description
                    }
                ]
            }
            const string = JSON.stringify(json);
            await AsyncStorage.setItem('data',string);
        }
        else {
            const string = await AsyncStorage.getItem('data');
            const json = JSON.parse(string);
            const listOfNotes = json.notes;
            listOfNotes.push({id: getRandomNumber(), title : title, description : description})
            json.notes = listOfNotes;
            const stringData = JSON.stringify(json);
            await AsyncStorage.setItem('data',stringData)
        }
        navigation.navigate('Home')
    }

    return (
        <SafeAreaView style={styles.body}>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder='Add a title'
            />
            <TextInput
                editable
                multiline
                numberOfLines={5}
                onChangeText={setDescription}
                value={description}
                style={styles.input}
                placeholder='Add a description'
            />
            <TouchableOpacity onPress={() => addNote()}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>
                        Add
                    </Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default AddNote

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        position: 'relative',
        backgroundColor: '#EEEEE'
    },
    input: {
        marginVertical: 10,
        backgroundColor: '#fff',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
            },
            android: {
                elevation: 6,
            },
        }),
        borderRadius: 15,
        padding: 15,
        fontSize: 17
    },
    button: {
        backgroundColor: 'red',
        marginVertical: 10,
        padding: 15,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    buttonText: {
        fontSize: 15,
        color: 'white',
        fontWeight: '500'
    }
})