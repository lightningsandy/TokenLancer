import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import ProposalCard from '../components/ProposalCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const ClientProposal = ({ navigation }) => {

    const isFocused = useIsFocused();
    const [proposals, setProposals] = useState([]);
    const [noContent, setNoContent] = useState(false);

    const onPress = (jobId, applicationId, hirer, tokenlancer) => {
       navigation.navigate("Hire", {
           jobId,
           applicationId,
           hirer,
           tokenlancer
       })
    }

    useEffect(() => {


        setNoContent(false);


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

              const url = `https://tokenlancer.uc.r.appspot.com/api/accountservice/${userName}/hirer/proposals`
              
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


           
          
             setProposals(allDetails);
             
        }

        info();
        

    }, [isFocused])    

    if(noContent){
        return (
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
             <Text style={{fontSize: 32}}>No Proposals</Text>
            </View>
            
        )
    }



    return (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={proposals}
          keyExtractor={(proposals) => proposals.applicationId}
          renderItem={({item}) => {
              return (
                <ProposalCard 
               lancerName = {item.tokenlancer}
               jobTitle = {item.jobTitle}
               lancerDesp = {item.description}
               price = {item.tokensPerHour}
               approxHours = {item.totalHours}
               onPress = {() => onPress(item.jobId, item.applicationId, item.hirer, item.tokenlancer)}
               type = "Client"
             /> 
              )
          }} />
    )
}

export default ClientProposal

const styles = StyleSheet.create({})
