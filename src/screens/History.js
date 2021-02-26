import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();



import LancerHistoryScreen from './LancerHistory';
import ClientHistoryScreen from './ClientHistory';



const History = () => {
    return (
        <View style={{flex: 1}}>
        <Tab.Navigator
        initialRouteName = "Freelancer"
        tabBarPosition = "bottom"
        initialLayout = {{ width: Dimensions.get('window').width }}
        tabBarOptions={{
          labelStyle: { fontSize: 12, fontWeight: '400' },
           style: { backgroundColor: 'white' },
  }}
        >
          <Tab.Screen name="Freelancer" component={LancerHistoryScreen} />
          <Tab.Screen name="Client" component={ClientHistoryScreen} />
        </Tab.Navigator>
        </View>
      );
}


export default History

const styles = StyleSheet.create({})
