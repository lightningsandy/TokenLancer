import React from 'react'
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();


import LancerProposalScreen from './LancerProposal';
import ClientProposalScreen from './ClientProposal';
import HireScreen from './Hire';


const ProposalStack = () => {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: "white"}}> 
        <Tab.Navigator
        initialRouteName = "Freelancer"
        tabBarPosition = "bottom"
        initialLayout = {{ width: Dimensions.get('window').width }}
        tabBarOptions={{
          labelStyle: { fontSize: 12, fontWeight: '400' },
           style: { backgroundColor: 'white' },
  }}
        >
          <Tab.Screen name="Freelancer" component={LancerProposalScreen} />
          <Tab.Screen name="Client" component={ClientProposalScreen} />
        </Tab.Navigator>
        </SafeAreaView>
      );
}


const Proposal = () => {
  return (
    <Stack.Navigator initialRouteName = "Proposal">
    <Stack.Screen name="Proposal" component = {ProposalStack} options={{ headerShown: false}} />
    <Stack.Screen name="Hire" component = {HireScreen} options={{ headerShown: false}} />
  </Stack.Navigator>
  )
}

export default Proposal

const styles = StyleSheet.create({})
