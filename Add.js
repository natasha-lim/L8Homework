import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    pageHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
        textAlign: 'center',
        marginTop: 5
    },

    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10
    },

    input: {
        height: 40,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 6,
        paddingLeft: 10,
        marginBottom: 15
    }
});

const Add = ({navigation, route}) => {
    const [book, setBook] = useState('');
    const [bookisbn, setIsbn] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [bookcopies, setCopies] = useState('');
    const [bookgenre, setBookgenre] = useState('');

    const setData = async(value) => {
        AsyncStorage.setItem('bookdata', value);
        navigation.navigate('Home');
    }

    return (
        <View style={{padding: 10, marginTop: 30}}>
            <Text style={styles.pageHeader}>Add Book</Text>
            <View style={{padding: 10}}>
                <Text style={styles.label}>Title:</Text>
                <TextInput style={styles.input} onChangeText={(text) => setBook(text)} />
            </View>

            <View style={{padding: 10}}>
                <Text style={styles.label}>ISBN:</Text>
                <TextInput style={styles.input} onChangeText={(text) => setIsbn(text)} />
            </View>

            <View style={{padding: 10}}>
                <Text style={styles.label}>Image URL:</Text>
                <TextInput style={styles.input} onChangeText={(url) => setImageURL(url)} />
            </View>

            <View style={{padding: 10}}>
                <Text style={styles.label}>Copies:</Text>
                <TextInput style={styles.input} onChangeText={(text) => setCopies(text)} />
            </View>

            <View style={{padding: 10}}>
                <Text style={styles.label}>Genre:</Text>
                <RNPickerSelect value={bookgenre}
                                onValueChange={(value) => setBookgenre(value)}
                                items={[
                                    {label: 'Adventure', value: 'Adventure'},
                                    {label: 'Manga', value: 'Manga'},
                                ]}
                />
            </View>
            <Button
                title="Submit"
                onPress={() => {
                    let mydata = JSON.parse(route.params.datastring);
                    let newBook = {title: book, isbn: bookisbn, image: imageURL, copies: bookcopies};
                    let indexNum = 1;
                    if (bookgenre === "Adventure") {
                        indexNum = 0;
                    }
                    mydata[indexNum].data.push(newBook);
                    let stringdata = JSON.stringify(mydata);
                    setData(stringdata)
                    //navigation.navigate('Home');
                }}
            />
        </View>


    )
}

export default Add;
