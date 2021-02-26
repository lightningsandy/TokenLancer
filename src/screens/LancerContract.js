import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import ContractCard from '../components/ContractCard';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LancerContract = () => {


    const isFocused = useIsFocused();
    const [contracts, setContracts] = useState([]);
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
      
    const url = `https://tokenlancer.uc.r.appspot.com/api/accountservice/${userName}/tokenlancer/contracts`
      
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

     setContracts(allDetails);
     setIsloading(false);
     
}

info();


    }, [isFocused]) 


    if(noContent){
        return (
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
             <Text style={{fontSize: 32}}>No Contracts</Text>
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
          data={contracts}
          keyExtractor={(contracts) => contracts.applicationId}
          renderItem={({item}) => {
              return (
                <ContractCard 
               clientName = {item.hirer}
               clientTitle = {item.jobTitle}
               clientDesp = {item.jobDesp}
               hoursBought = {item.tokensPerHour}
               hoursRemainingTotal = {item.totalHours}
               type = "Lancer"
             /> 
              )
          }} />
           
           
    )
}

export default LancerContract

const styles = StyleSheet.create({})

