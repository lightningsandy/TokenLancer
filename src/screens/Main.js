import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';



const Tab = createMaterialBottomTabNavigator();

//screens
import ProposalScreen from './Proposal';
import ContractScreen from './Contract';
import ProjectScreen from './Project';
import ProfileScreen from './Profile';




//icons
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Main = ({ navigation }) => {



    return (
           <Tab.Navigator
             initialRouteName = "Projects"
             activeColor="white"
             inactiveColor="black"
             barStyle={{ backgroundColor: 'black' }}
             shifting={true}
            >
          <Tab.Screen 
          name="Projects" 
          component={ProjectScreen} 
          options={{
                tabBarLabel: 'Jobs',
                tabBarIcon: ({ color }) => (
                  <MaterialIcons name="home" size={24} color="white" />
                ),
              }}  
          />
          <Tab.Screen
          name="Proposals" 
          component={ProposalScreen} 
          options={{
                tabBarLabel: 'Proposals',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="file-document-edit" size={24} color="white" />
                ),
              }}  
          />
          <Tab.Screen 
          name="Contract" 
          component={ContractScreen} 
          options={{
                tabBarLabel: 'Contract',
                tabBarIcon: ({ color }) => (
                  <FontAwesome5 name="file-contract" size={24} color="white" />
                ),
              }}  
          />
           <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                  <FontAwesome name="user-circle" size={24} color="white" />
                ),
              }}  
          />
          </Tab.Navigator>
      );
}

export default Main

const styles = StyleSheet.create({})
