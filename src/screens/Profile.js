import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native'
import { Button as PaperButton, Avatar, FAB } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';


import {AuthContext} from '../../App';

import BuyTokenScreen from './BuyNewTokens';
import HistoryScreen from './History';


const Stack = createStackNavigator();


const { width, height } = Dimensions.get('screen');


const ProfileStack = ( { navigation }) => {


  const isFocused = useIsFocused();
  const [user, setUser] = useState("");
  const [tokens, setTokens] = useState(0);
  const [tokensSold, setTokensSold] = useState(0);
  const [tokensBought, setTokensBought] = useState(0);

  const { signOut } = React.useContext(AuthContext);

  const getLabel = (name) => {
    return name.substring(0, 2);
   }

  useEffect(() => {
    const info = async () => {
      let userName = await AsyncStorage.getItem('userToken');
  
      var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        
      const url = `https://tokenlancer.uc.r.appspot.com/api/accountservice/${userName}/profile-details`
        
      var result = await fetch(url, requestOptions)
              .then(response => response.json())
  
       setUser(userName);
       setTokens(result.tokens);
       setTokensSold(result.tokensSold);
       setTokensBought(result.tokensBought);
       
  }
  
  info();
  
  }, [isFocused])


  const onSignOut = () => {

    const removeValue = async () => {

      try {
        await AsyncStorage.removeItem('userToken')
      } catch(e) {
        // remove error
      }
    }
    
    removeValue();
    signOut();
    
  }


    
    return (
        <View style={styles.container}>
        <View style={{flexDirection:'row'}}>
            <Avatar.Text size={58} label={getLabel(user)} />
            <Text style={styles.userName}>{user}</Text>
        </View>
        <View style={styles.textContainer}>
          <View>
          <Text style={styles.textStyle}>
            Total Token Bought :
            <Text>{tokensBought}</Text>
            </Text>
          </View>
          <View>
          <Text style={styles.textStyle}>
            Total Token Sold :
            <Text>{tokensSold}</Text>
            </Text>
          </View>
          <View>
          <Text style={styles.textStyle}>
            Total Token Available :
            <Text>{tokens}</Text>
            </Text>
          </View>
        </View>
          <PaperButton 
            mode="contained" 
            dark = {true}
            style={styles.buyButton}
            onPress = {() => navigation.navigate("BuyToken")}
            >
           Buy More Tokens
            </PaperButton>
            <PaperButton 
            mode="contained" 
            dark = {true}
            style={styles.buyButton}
            onPress = {() => onSignOut()}
            >
           LogOut
            </PaperButton>
            <FAB
            label = "History"
    style={styles.fab}
    icon="history"
    onPress={() => navigation.navigate("History")}
  />
            
           
        </View>
    )
}

const Profile = () => {
    return (
    <Stack.Navigator initialRouteName = "Profile" style={{backgroundColor: "white"}}>
    <Stack.Screen name="Profile" component = {ProfileStack} options={{ headerShown: false}} />
    <Stack.Screen name="BuyToken" component = {BuyTokenScreen} options={{ headerShown: false}} />
    <Stack.Screen name="History" component = {HistoryScreen} />
   </Stack.Navigator>
    );
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 30,
        marginTop: height * 0.1,
        backgroundColor: "white"
    },
    buyButton: {
        marginTop: 40,
        marginBottom: 30,
        backgroundColor: "black",
    },
    textStyle: {
        fontSize: 22,
        marginTop: 10,
        textAlign: 'center'
    },
    userName: {
        fontSize: 40,
        fontWeight: '500',
        marginLeft: 20
    },
    textContainer: {
        marginTop: 50,
        backgroundColor: "#E5E5E5",
        height: 150,
        justifyContent: 'center'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "black"
      },
    historyText: {
        fontSize: 22,
        marginTop: 10,
        fontWeight: '600'
    }
})
