import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Avatar, Button } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

const JobCard = (props) => {

    const getLabel = (name) => {
        return name.substring(0, 2);
       }

       
    return (
        <View style={{backgroundColor: 'white', width: width, padding: 20, borderRadius: 10}}>
            <View style={{flexDirection:'row'}}>
            <Avatar.Text size={24} label={getLabel(props.userName)} />
            <Text style={styles.userName}>{props.userName}</Text>
            </View>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.desp}>
                <Text>{props.desp}</Text>
            </View>
            <Text style={styles.skills}>Skills: {props.skills}</Text>
            <Button style={styles.buttonStyle} icon="check" mode="contained" color="black" compact={true} onPress={() => props.onAccept()}>
             Apply
            </Button>
        </View>
    )
}

export default JobCard

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: '500',
        marginTop: 10
    },
    userName: {
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 10
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
    skills: {
        fontSize: 16,
        marginTop: 10
    }
})
