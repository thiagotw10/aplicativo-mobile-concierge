import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons"

export default function MenuTop({nome, fundo}){
   return (
    <View style={[styles.containerCesta, {backgroundColor: fundo}]}> 
        <Text style={styles.texto}>{nome}</Text>
        <TouchableOpacity style={styles.radiusIcone}>
          <Feather name="user" size={30} color="#fff"/>
        </TouchableOpacity>
    </View>
   )
}

const styles = StyleSheet.create({
    containerCesta: {
      flex: 1,
      backgroundColor: '#339194',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      flexDirection: 'row',
      paddingLeft: 20,
      paddingEnd: 20,
      justifyContent: 'space-between'
    },

    texto:{
      fontSize: 20,
      color: '#fff',
      fontWeight: 'bold'
    },
    radiusIcone:{
      backgroundColor: '#77b885',
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50
    }
  });