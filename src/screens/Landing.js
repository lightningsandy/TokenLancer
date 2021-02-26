import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Button, ImageBackground, Image, Dimensions, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import  { Onboarding }  from '../constants/Images';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import { Button as PaperButton } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';


const { height, width } = Dimensions.get('screen');

const Landing = ({ navigation }) => {
        

    const [fontsLoaded, setFontsLoaded] = useState(false);

      const loadFonts =  async () => {
        await Font.loadAsync({
          Play: require("../../assets/fonts/Play-Bold.ttf")
        });
        const bgImage = 
        setFontsLoaded(true);
      }

      useEffect(() => {
        loadFonts();
      });

      if (!fontsLoaded) {
        return null;
      }

    return (
         <View style={styles.container}>
           <StatusBar barStyle="dark-content" />
            <ImageBackground
            source={Onboarding}
            style={{ flex: 1, height, width }}
            />
            <Text style={styles.headingStyle}>
                TokenLancer
            </Text>

            <PaperButton 
            mode="contained" 
            dark = {false}
            style={{...styles.registerButton, backgroundColor: 'white',  marginBottom: 20}}
            onPress = {() => {
                    navigation.navigate("Register")
            }}
            >
            Register
            </PaperButton>

            <PaperButton 
            mode="contained" 
            dark = {true}
            style={{...styles.registerButton, backgroundColor: 'black',  marginBottom: height * 0.1}}
            onPress = {() => {
                    navigation.navigate("Login")
            }}
            >
            Login
            </PaperButton>
           <StatusBar style="dark" />
        </View>
    )
}

export default Landing

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    headingStyle: {
        fontSize: 40,
        color: 'white',
        fontFamily: 'Play',
        position: 'absolute',
        top: height * 0.22,
        left: width/2 - 121,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    registerButton: {
        width: width * 0.8, 
        marginLeft: width / 2 - 150
    }
})
