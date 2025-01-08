import React, {useState} from 'react';
import {TextInput, View, Text, Button, StyleSheet, Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    button: {
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
    },

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

const Edit = ({navigation, route}) => {
    let mydata = JSON.parse(route.params.datastring);
    let myindex = route.params.index;
    const [book, setBook] = useState(route.params.title);
    const [bookisbn, setIsbn] = useState(route.params.isbn);
    const [imageURL, setImageURL] = useState(route.params.image);
    const [bookcopies, setCopies] = useState(route.params.copies);

    const setData = async(value) => {
        AsyncStorage.setItem('bookdata', value);
        navigation.navigate('Home');
    }

    return (
        <View style={{padding: 10}}>
            <Text style={styles.pageHeader}>Edit Book</Text>
            <View style={{padding: 10}}>
                <Text style={styles.label}>Title:</Text>
                <TextInput style={styles.input} value={book} onChangeText={(text) => setBook(text)} />
            </View>

            <View style={{padding: 10}}>
                <Text style={styles.label}>ISBN:</Text>
                <TextInput style={styles.input} value={bookisbn} onChangeText={(text) => setIsbn(text)} />
            </View>

            <View style={{padding: 10}}>
                <Text style={styles.label}>Image URL:</Text>
                <TextInput style={styles.input} value={imageURL} onChangeText={(url) => setImageURL(url)} />
            </View>

            <View style={{padding: 10}}>
                <Text style={styles.label}>Copies:</Text>
                <TextInput style={styles.input} value={bookcopies} onChangeText={(text) => setCopies(text)} />
            </View>

            <View style={styles.button}>
                <View style={{width:175}}>
                    <Button
                        title="Save"
                        onPress={() => {
                            const indexNum = route.params.bookgenre === "Adventure" ? 0:1;
                            mydata[indexNum].data[myindex].title = book;
                            mydata[indexNum].data[myindex].isbn = bookisbn;
                            mydata[indexNum].data[myindex].image = imageURL;
                            mydata[indexNum].data[myindex].copies = bookcopies;
                            let datastr = JSON.stringify(mydata);
                            setData(datastr);

                            //navigation.navigate('Home');
                    }}
                />
                </View>

                <View style={{width: 175}}>
                    <Button
                        title="Delete"
                        onPress={() => {
                            const indexNum = route.params.genre === "Adventure" ? 0:1;
                            Alert.alert("Are you sure?", '', [
                                {
                                    text: 'Yes',
                                    onPress: () => {
                                        mydata[indexNum].data.splice(myindex, 1);
                                        let datastr = JSON.stringify(mydata);
                                        setData(datastr);

                                        //navigation.navigate('Home');
                                    }
                                },
                                {text: 'No'}
                            ]);
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default Edit;
