import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList} from 'react-native'
import HistoryCard from '../components/HistoryCard';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LancerHistory = ({ navigation }) => {

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


        const getJobDetails = async (obj, hirer, jobid) => {

              
            var requestOptions = {
                       method: 'GET',
                       redirect: 'follow'
                   };

            const url = `https://tokenlancer.uc.r.appspot.com/api/jobservice/get-a-job?hirer=${hirer}&jobId=${jobid}`     

            var result = await fetch(url, requestOptions)
            .then(response => {
                return response.json()
            })

            var newObj = {...obj, "jobTitle": result.title, "jobDesp": result.description}

            return newObj;


   }

    
   const info = async () => {
    let userName = await AsyncStorage.getItem('userToken');

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    const url = `https://tokenlancer.uc.r.appspot.com/api/accountservice/${userName}/tokenlancer/all-jobs`
      
    var result = await fetch(url, requestOptions)
            .then(response => {
                if(response.status === 204){
                    setNoContent(true)
                }
                return response.json()
            })

    
            const allDetails = await Promise.all(result.map(obj => {

                var newDetails = getJobDetails(obj, obj.hirer, obj.jobId)
        
                return newDetails;
             }))

     setHistory(allDetails);
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
               clientTitle = {item.jobTitle}
               clientDesp = {item.jobDesp}
               clientName = {item.hirer}
               hoursSold = {item.totalHours}
               status = {item.status}
               type = "Lancer"
           />
              )
          }} />
           
          
    )
}

export default LancerHistory

const styles = StyleSheet.create({})
