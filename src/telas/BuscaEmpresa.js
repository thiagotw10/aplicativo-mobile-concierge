import * as React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Alert, ActivityIndicator, TextInput, Button } from "react-native";
import { Feather } from "@expo/vector-icons"
import api from "../servicos/axios";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

export default function Login(){
    const navigation = useNavigation();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [items, setItems] = React.useState([]);

    React.useEffect(()=>{
        buscarEmpreas()
    }, [])

    async function buscarEmpreas(){
        const empresas = await api.get('empresas').then(val=> val.data).catch((error)=> error)
        setItems(empresas)
    }

    function enviarEmpresa(empresa){
        if(empresa != null){
            setValue(null)
           const hospital = items.filter(val => val.value == empresa)
            navigation.navigate('Login', hospital)
        }
    }

    return <>
        <View style={styles.container}>
            <View style={styles.containerLogin}>
                <View style={styles.containerTexto}>
                    <Text style={styles.textoSelecione}>3wings</Text>
                    <Text style={styles.seja}>Seja bem vindo</Text>
                </View>
                <View style={styles.containerSelect}>
                    <DropDownPicker style={styles.select}
                        placeholder="Selecione sua empresa"
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        onChangeValue={enviarEmpresa(value)}
                    />
                </View>
            </View>
        </View>
    </>
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        backgroundColor: '#4eb3de',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerLogin:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerTexto:{
        top: -100
    },
    containerSelect:{
        
    },

    select:{
        backgroundColor: 'white',
        width: 300,
        alignContent: 'center'
    },
    textoSelecione:{
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    seja:{
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    }
})
