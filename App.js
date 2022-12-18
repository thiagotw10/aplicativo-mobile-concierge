import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MenuTop from './src/telas/MenuTop';
import Lista from './src/telas/Lista';
import React from 'react';
import api from './src/servicos/axios';

class App extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <MenuTop/>
        <Lista key={'1'}/>
        <StatusBar style="auto" />
      </View>
    );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
});

export default App