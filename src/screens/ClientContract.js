import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import ContractCard from '../components/ContractCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const ClientContract = ({ navigation }) => {


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

            var newObj = {...obj, "jobTitle": result.title}

            return newObj;


   }

   const info = async () => {
    let userName = await AsyncStorage.getItem('userToken');

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    const url = `https://tokenlancer.uc.r.appspot.com/api/accountservice/${userName}/hirer/contracts`
      
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


    const onPress = (tokenlancer, hirer) => {
       navigation.navigate("Extra", {
           tokenlancer,
           hirer
       })
    }





    const onComplete = (jId, aId, hirer, tokenlancer, data ) => {

        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"jobId":jId,"applicationId":aId,"hirer":hirer,"tokenlancer":tokenlancer});

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://tokenlancer.uc.r.appspot.com/api/jobservice/hirer/complete-jobs", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  const newData = data.filter(data => {
    return data.applicationId !== aId
})

if(newData.length === 0){
    setNoContent(true)
  }
  
  setContracts(newData);

    }


    return (

         <FlatList
          showsVerticalScrollIndicator={false}
          data={contracts}
          keyExtractor={(contracts) => contracts.applicationId}
          renderItem={({item}) => {
              return (
                <ContractCard 
               clientTitle = {item.jobTitle}
               userName = {item.tokenlancer}
               hoursBought = {item.tokensPerHour}
               hoursRemainingTotal = {item.totalHours}
               type = "Client"
               onPress = {() => onPress(item.tokenlancer, item.hirer)}
               onComplete = {() => onComplete(item.jobId, item.applicationId, item.hirer, item.tokenlancer, contracts)}
             /> 
              )
          }} />
    )
}

export default ClientContract

const styles = StyleSheet.create({})
