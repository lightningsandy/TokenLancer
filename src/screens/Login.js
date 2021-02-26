import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, Dimensions, ImageBackground, Keyboard, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button as PaperButton, HelperText } from 'react-native-paper';
import {AuthContext} from '../../App';
const { width, height } = Dimensions.get('screen');


const Register = ({ navigation }) => {

    const [name,setName] = React.useState("");
    const [userName,setUserName] = React.useState("");
    const [error, setError] = React.useState("");

    const { signIn } = React.useContext(AuthContext);

    const onLogin = () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

          const url = `https://tokenlancer.uc.r.appspot.com/api/accountservice/?username=${userName}`
          
          fetch(url, requestOptions)
            .then(response => response.text())
            .then(result =>  {
                if(result === "Found"){
                   signIn({ name, userName });
                } else if(result === "Not Found") {
                    setError("Username not found");
                } else {
                   setError("something went wrong");
                }
            })
            .catch(error => console.log('error', error));

        // signIn({ name, userName })
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
         <View style={styles.container}>

            <Text style={styles.headingStyle}>
                Login
            </Text>

            <TextInput 
                style={styles.inputBox}
                mode = "outlined"
                label="name"
                value={name}
                onChangeText = {(name) => setName(name)}
            />

            <TextInput 
                style={styles.inputBox}
                mode = "outlined"
                label="username"
                placeholder="enter unique username"
                value={userName}
                onChangeText = {(userName) => setUserName(userName)}
                error = {false}
            />
            <HelperText type="error" visible={error === "" ? false : true}>
            {error}
            </HelperText>

            <PaperButton 
            mode="contained" 
            dark = {true}
            style={styles.registerButton}
            onPress = {() => onLogin()}
            >
            Login
            </PaperButton>

            <TouchableOpacity
              onPress = {() => {
                    navigation.navigate("Register")      
                }}>
            <Text
            style={styles.buttonText}>
                <Text style={styles.loginPara}>Don't have an account?  </Text>
                Sign up
            </Text>
            </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    inputBox: {
        width: width * 0.9,
        padding: 10,
        fontSize: 16,
    },
    buttonText: {
        fontSize: 17,
        color: 'blue',
        marginTop: 20,
        marginRight: width * 0.1
    },
    loginPara: {
        color: 'black'
    },
    registerButton: {
        marginTop: 20,
        width: width * 0.8, 
        marginLeft: width / 2 - 190,
        backgroundColor: 'black'
    },
    headingStyle: {
        fontSize: 40,
        color: 'black',
        marginTop: height * 0.27
    }
})

export default Register


