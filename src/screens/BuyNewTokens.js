import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Dimensions, ScrollView, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button as PaperButton } from 'react-native-paper';



const { width, height } = Dimensions.get('screen');


const BuyNewTokens = ({ navigation }) => {

    const [token,setToken] = useState("");


    const onSubmit = () => {
       navigation.navigate("Profile")
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={{backgroundColor: 'white'}}>
         <View style={styles.container}>
            <Text style={styles.headingStyle}>
                Buy Token
            </Text>

            <TextInput 
                style={styles.inputBox}
                mode = "outlined"
                label="No of new tokens to buy"
                value={token}
                onChangeText = {(token) => setToken(token)}
            />
            <PaperButton 
            mode="contained" 
            dark = {true}
            style={styles.registerButton}
            onPress = {() => onSubmit()}
            >
           Buy
            </PaperButton>
        </View>
        </ScrollView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    inputBox: {
        width: width * 0.9,
        padding: 10,
        fontSize: 16,
    },
    registerButton: {
        marginTop: 20,
        width: width * 0.8, 
        marginLeft: width / 2 - 190,
        backgroundColor: 'black',
        marginBottom: 30
    },
    headingStyle: {
        fontSize: 40,
        color: 'black',
        marginTop: height * 0.27
    }
})

export default BuyNewTokens


