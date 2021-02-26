import React, {useState} from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Avatar, Button, DataTable } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

const HistoryCard = (props) => {

    const getLabel = (name) => {
        return name.substring(0, 2);
       }

 if(props.type === "Client") {
    return (
        <View style={{backgroundColor: 'white', width: width, padding: 20, borderRadius: 10}}>
        <Text style={styles.title}>{props.clientTitle}</Text>
            <View style={styles.desp}>
                <Text>{props.clientDesp}</Text>
            </View>
            <View style={{flexDirection:'row', marginTop: 10}}>
            <Text style={styles.subtitle}>Status:</Text>
            <Text style={styles.subtitle}>{props.status}</Text>
            </View>
        </View>
    );
 } 
 else {
    return (
        <View style={{backgroundColor: 'white', width: width, padding: 20, borderRadius: 10}}>
            <Text style={styles.title}>{props.clientTitle}</Text>
            <View style={styles.desp}>
                <Text>{props.clientDesp}</Text>
            </View>
            <View style={{flexDirection:'row', marginTop: 10}}>
            <Text style={styles.subtitle}>Posted By</Text>
            <Avatar.Text size={24} label={getLabel(props.clientName)} />
            <Text style={styles.userName}>{props.clientName}</Text>
            </View>
            <View style={{flexDirection:'row', marginTop: 10}}>
            <Text style={styles.subtitle}>Total token sold:</Text>
            <Text style={styles.subtitle}>{props.hoursSold}</Text>
            </View>
            <View style={{flexDirection:'row', marginTop: 10}}>
            <Text style={styles.subtitle}>Status:</Text>
            <Text style={styles.subtitle}>{props.status}</Text>
            </View>
        </View>
    );
 }
}

export default HistoryCard

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: '500',
        marginTop: 10
    },
    userName: {
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 5
    },
    desp: {
        width: width * 0.9,
        backgroundColor: "#E5E5E5",
        marginTop: 10,
        borderRadius: 5,
        padding: 15
    },
    buttonStyle: {
        marginTop: 10
    },
    subtitle: {
        fontSize: 20,
        marginRight: 20,
        fontWeight: '500'
    }
})
