import React, {useState, useEffect} from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons"
import api from "../servicos/axios";
import { useRoute } from '@react-navigation/native';
import MenuTop from "./MenuTop";


export default function Lista(){
const route = useRoute()
const [atividades, setAtividade] = useState('')
const [total, setTotal] = useState('0')
const [loading, setLoading] = useState('')

    useEffect(()=>{
        rodar()
    }, [])

   async function rodar(){
        setLoading(true)
        const ativi = await api.get('celular/'+route.params.id).then(val=> val.data).catch((error)=> error)
        setAtividade(ativi.atividades)
        setTotal(ativi.total)
        setLoading(false)
    }
   
   return <>
   <MenuTop nome={route.params.nome}/>
    <View style={styles.containerCesta}> 
        <View style={styles.cardMenu}>
            <View>
                <Text style={styles.texto}>Tarefas</Text>
                <Text><Text style={{fontWeight: 'bold'}}>Total de tarefas:</Text> {total}</Text>
            </View>
            <TouchableOpacity onPress={rodar}>
                <Feather name="refresh-cw" size={25} color={'#fff'}/>
            </TouchableOpacity>
        </View>
        <View style={styles.cards}>
            <View style={styles.view}>
                <ScrollView>
                    {  loading ? <ActivityIndicator size="large" color="#00ff00"/> : atividades != '' ?
                    
                        Object.keys(atividades).map((item) => {  
                         return <TouchableOpacity key={atividades[item].id} style={[styles.card, {borderColor: atividades[item].cor}]}>
                                <View style={[styles.fundoIconce, {backgroundColor: atividades[item].cor}]}>
                                    <Feather name="activity" size={30} color={'#fff'}/>
                                </View>
                                <View>
                                    <View style={[styles.status, {backgroundColor: atividades[item].cor}]}>
                                        <Text style={{fontWeight: 'bold'}}>{atividades[item].status}</Text>
                                    </View>
                                    <Text style={styles.tituloCard}>{atividades[item].nome}</Text>
                                    <View style={styles.cardData}>
                                        <Text style={styles.textoData}>Data - Hora: </Text>
                                        <Text style={styles.textoDatinha}>{atividades[item].hora}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                          }) : <Text>Nenhuma tarefa encontrada.</Text>
                    }
                </ScrollView>
            </View>
        </View>
    </View>
    </>
}

const styles = StyleSheet.create({
    containerCesta: {
      flex: 4,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    cardMenu: {
        flex: 1,
        backgroundColor: '#77b885',
        flexDirection: 'row',
        width: '90%',
        top: -15,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingEnd: 20,
    },
    cards: {
        flex: 7,
        width: '100%',
        alignItems: 'center',
    },
    texto:{
        fontSize: 17,
        color: '#fff',
    },
    card:{
        position: 'relative',
        borderColor: '#80b3ff',
        width: '94%',
        borderWidth: 2,
        minHeight: 70,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 14
    },
    fundoIconce:{
      backgroundColor: '#80b3ff',
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
    },
    tituloCard:{
        fontWeight: 'bold',
        fontSize: 15
    },
    cardData:{
        flexDirection: 'row'
    },
    textoData:{
        fontWeight: 'bold',
        fontSize: 12
    },
    view: {
        width: '92%',
        alignItems: "center"
    },
    textoDatinha:{
        fontSize: 12
    },
    status:{
        position: 'absolute',
        top: -30,
        right: -5,
        color: 'white',
        backgroundColor: '#77b885',
        minWidth: 70,
        height: 30,
        padding: 5,
        alignItems: 'center',
        borderRadius: 10
    }
  });