import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList} from 'react-native'
import HistoryCard from '../components/HistoryCard';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ClientHistory = ({ navigation }) => {

    const onPress = () => {
       navigation.navigate("Hire")
    }


    const isFocused = useIsFocused();
    const [history, setHistory] = useState([]);
    const [noContent, setNoContent] = useState(false);
    const [isloading, setIsloading] = useState(true);



    useEffect(() => {


        setNoContent(false);
        setIsloading(true);

    
   const info = async () => {
    let userName = await AsyncStorage.getItem('userToken');

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    const url = `https://tokenlancer.uc.r.appspot.com/api/accountservice/${userName}/hirer/all-jobs`
      
    var result = await fetch(url, requestOptions)
            .then(response => {
                if(response.status === 204){
                    setNoContent(true)
                }
                return response.json()
            })

    
    console.log(history);

     setHistory(result);
     setIsloading(false);
     
}

info();


    }, [isFocused]) 


    if(noContent){
        return (
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
             <Text style={{fontSize: 32}}>No History</Text>
            </View>
            
        )
    }

    if(isloading){
        return (
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
             <Text style={{fontSize: 32}}>Loading</Text>
            </View>
            
        )
    }



    return (

         <FlatList
          showsVerticalScrollIndicator={false}
          data={history}
          keyExtractor={(history) => history.jobId}
          renderItem={({item}) => {
              return (
                <HistoryCard 
               clientTitle = {item.title}
               clientDesp = {item.description}
               status = {item.status}
               type = "Client"
           />
              )
          }} />
           
          
    )
}

export default ClientHistory

const styles = StyleSheet.create({})
