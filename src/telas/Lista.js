import React, {useState, useEffect} from "react";
import { useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Abertos from "./Abertos";
import Historico from "./Historico";




export default function Lista(){
const Tab = createBottomTabNavigator();
const route = useRoute()

   return <>
   <Tab.Navigator
   screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Abertos') {
        iconName = focused
          ? 'book-outline'
          : 'book-outline';
      } else if (route.name === 'Historico') {
        iconName = focused ? 'clipboard-outline' : 'clipboard-outline';
      }

      // You can return any component that you like here!
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#77b885',
    tabBarInactiveTintColor: 'gray',
  })}
   >
        <Tab.Screen options={{headerShown: false}} name="Abertos" children={() => <Abertos userData={route.params} />} />
        <Tab.Screen options={{headerShown: false}} name="Historico" children={() => <Historico userData={route.params} />} />
    </Tab.Navigator>
    </>
}
