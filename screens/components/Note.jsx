import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import React from 'react'

const Note = ({title, description, id, navigation}) => {
    return (
        <TouchableOpacity onLongPress={()=>navigation.navigate('EditNote',{id})}>
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.divider} />
            <Text style={styles.description}>{description}</Text>
        </View>
        </TouchableOpacity>
    )
}

export default Note

const styles = StyleSheet.create({
    container: {
        minHeight : 150,
        marginBottom: 15,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 25,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    divider: {
        borderColor: 'red',
        borderWidth: 1,
        marginVertical:  7.
        
    },
    title: {
        color: '#000',
        fontWeight: "600",
        fontSize: 17
    },
    description : {
        color: 'grey',
        fontSize: 15
    }
})