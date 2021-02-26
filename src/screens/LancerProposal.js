import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import ProposalCard from '../components/ProposalCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';



const LancerProposal = ({ navigation }) => {

    const isFocused = useIsFocused();
    const [proposals, setProposals] = useState([]);
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
              
            const url = `https://tokenlancer.uc.r.appspot.com/api/accountservice/${userName}/tokenlancer/proposals`
              
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
             setIsloading(false);
             
        }

        info();
        

    }, [isFocused])  
    


    const onPress = (id, tokenlancer, hirer, data) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"hirer": hirer,"tokenlancer": tokenlancer,"applicationId": id});
        
        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("https://tokenlancer.uc.r.appspot.com/api/jobservice/tokenlancer", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

          const newData = data.filter(data => {
              return data.applicationId !== id
          })


          if(newData.length === 0){
            setNoContent(true)
          }
          
          setProposals(newData);


    }


    console.log(proposals);

    if(noContent){
        return (
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
             <Text style={{fontSize: 32}}>No Proposals</Text>
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
        <View style={{flex: 1, backgroundColor: "white"}}>
             <FlatList
          showsVerticalScrollIndicator={false}
          data={proposals}
          keyExtractor={(proposals) => proposals.applicationId}
          renderItem={({item}) => {
              return (
                <ProposalCard 
               clientName = {item.hirer}
               clientTitle = {item.jobTitle}
               clientDesp = {item.jobDesp}
               userName = {item.tokenlancer}
               userDetail = {item.description}
               price = {item.tokensPerHour}
               approxDays = {item.totalHours}
               onPress = {() => onPress(item.applicationId, item.tokenlancer, item.hirer, proposals)}
               type = "Lancer"
             /> 
              )
          }} />
        </View>
          
    )
}

export default LancerProposal

const styles = StyleSheet.create({})
