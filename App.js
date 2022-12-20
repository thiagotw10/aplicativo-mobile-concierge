import { StyleSheet, Text, View } from 'react-native';
import Lista from './src/telas/Lista';
import Empresas from './src/telas/BuscaEmpresa';
import Login from './src/telas/Login';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator styles={styles.container} initialRouteName="Login" >
          <Stack.Screen options={{headerShown: false}} name="Empresas" component={Empresas} />
          <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
          <Stack.Screen options={{headerShown: false}} name="Tarefas" component={Lista} />
        </Stack.Navigator>
      </NavigationContainer>
    );
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