import React, {useState} from 'react';
import {View, Text, StyleSheet, SectionList, TouchableOpacity, StatusBar, Image, Button, Touchable} from "react-native";
import {database} from './Data.js';
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
    headerText: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 0,
        marginRight:0,
        textAlign: 'center',
        fontSize: 25,
        padding: 10,
        color: 'white'
    },

    sections: {
        flex: 1,
        padding: 10,
        flexDirection: 'column',
        backgroundColor: 'beige',
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
    },

    pageHeader: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'blue',
        textAlign: 'center',
        marginBottom: 20
    },

    item: {
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'flex-start',
        padding: 10,
        borderBottomWidth: 1,
        marginBottom: 3
    },

    text: {
        fontSize: 15,
        flex: 1,
        fontWeight: 'bold',
    },

    image: {
        marginTop: 5,
        marginBottom: 5,
        width: 220,
        height: 300,
        resizeMode: 'contain',
    }
})

const Home = ({navigation}) => {

    const [mydata, setMydata] = useState([]);

    const getData = async() => {
        let datastr = await AsyncStorage.getItem('bookdata');
        if (datastr!=null) {
            jsondata = JSON.parse(datastr);
            setMydata(jsondata);
        }
        else {
            setMydata(database);
        }
    };
    getData();

    const renderItem = ({item, index, section}) => {
        return (
            <TouchableOpacity
                onPress={() =>
                {
                    let datastr = JSON.stringify(mydata);
                    navigation.navigate('Edit', {index:index, bookgenre: section.genre, title:item.title, isbn: item.isbn, image: item.image, copies: item.copies, datastring:datastr})
                }
            }
            >
                <View style={styles.item}>
                    <Text style={styles.text}>Book Title: {item.title}</Text>
                    <Text style={styles.text}>ISBN:{item.isbn}</Text>
                    <Text style={styles.text}>Copies owned: {item.copies}</Text>
                    <Image source={{uri: item.image}} style={styles.image} />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{flex:1, marginTop: 50, marginBottom: 50}}>
            <Text style={styles.pageHeader}>Books List</Text>
            <StatusBar hidden={true}/>
            <Button title="Add Book" onPress={() => {
                let datastr = JSON.stringify(mydata);
                navigation.navigate('Add', {datastring: datastr});
            }}

            />
            <View style={styles.sections}>
                <SectionList sections={mydata}
                             renderItem={renderItem}
                             renderSectionHeader={({section:{genre, bgColor}}) => (
                                 <View style={[styles.sections]}>
                                     <Text style={[styles.headerText, {backgroundColor: bgColor}]}>{genre}
                                     </Text>
                                 </View>
                             )}
                />
            </View>
        </View>
    );
};

export default Home;
