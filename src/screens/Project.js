import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Dimensions, StatusBar, ScrollView, FlatList } from 'react-native'
import JobCard from '../components/JobCard';
import { FAB } from 'react-native-paper';
import SearchBar from '../components/SearchBar';
import { useIsFocused } from '@react-navigation/native';


const { width, height } = Dimensions.get('screen');


const Project = ({ navigation }) => {

    const [term,setTerm] = useState("");
    const [jobs, setJobs] = useState([]);
    const isFocused = useIsFocused();
    
    const searchTerm = (searchTerm) => {

    }

    const jobAccept = (hirer, jobId) => {
        navigation.navigate("Accept", {
          "hirer": hirer,
          "jobId": jobId
        });
    }



      useEffect(() => {
        fetch("https://tokenlancer.uc.r.appspot.com/api/jobservice/", {
          method: 'GET',
          redirect: 'follow'
        })
        .then(response => response.json())
        .then(result => setJobs(result))
        .catch(error => console.log('error', error));
      }, [isFocused]);



    return (
        <View style={{flex:1, paddingTop: 80, backgroundColor: "white"}}>
           <StatusBar barStyle="dark-content" />
           <SearchBar 
            term={term} 
            onTermChange={(newTerm) => {setTerm(newTerm)}}
            onTermSubmit={() =>  searchTerm(term)}
             />
           <FlatList
          showsVerticalScrollIndicator={false}
          data={jobs}
          keyExtractor={(jobs) => jobs.jobId}
          renderItem={({item}) => {
              return (
                <JobCard 
               userName = {item.hirer}
               title = {item.title}
               desp = {item.description}
               skills = {item.skills}
               onAccept={() => jobAccept(item.hirer, item.jobId)}
             /> 
              )
          }} />
           <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => navigation.navigate("Post")}
            color= "white"
             />
        </View>
    )
}

export default Project

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "#0077B5" 
      },
})
