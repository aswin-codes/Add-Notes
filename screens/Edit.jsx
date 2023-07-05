import { View, Text, StyleSheet, TextInput, Platform, TouchableOpacity, SafeAreaView } from 'react-native'
import { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({ navigation }) => {
    const route = useRoute();
    const id = route.params?.id;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const setData = async (id) => {
        const string = await AsyncStorage.getItem('data');
        const json = JSON.parse(string);
        for (var i = 0; i < json.notes.length; i++) {
            if (json.notes[i].id == id) {
                setTitle(json.notes[i].title);
                setDescription(json.notes[i].description);
            }
        }
    }

    const DeleteData = async () => {
        const string = await AsyncStorage.getItem('data');
        const json = JSON.parse(string);
        var List = json.notes;
        List =  List.filter((item) => item.id != id);
        json.notes = List;
        await AsyncStorage.setItem('data', JSON.stringify(json))
        navigation.navigate('Home')
    }

    const EditData = async () => {
        const string = await AsyncStorage.getItem('data');
        const json = JSON.parse(string);
        var List = json.notes;
        List = List.map((item) =>
            item.id == id ? {
                id: id,
                title: title,
                description: description,
            } : item
        )
        json.notes = List;
        await AsyncStorage.setItem('data', JSON.stringify(json))
        navigation.navigate('Home')
    }

    useEffect(() => {
        setData(id);
    }, []);

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
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => { DeleteData() }}>
                    <View style={[styles.button, { backgroundColor: 'red' }]}>
                        <Text style={styles.buttonText}>
                            Delete
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { EditData() }}>
                    <View style={[styles.button, { backgroundColor: 'green' }]}>
                        <Text style={styles.buttonText}>
                            Edit
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Edit

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        position: 'relative',
        backgroundColor: '#EEEEE'
    },
    input: {
        color: '#000',
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
        width: 100,
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
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})