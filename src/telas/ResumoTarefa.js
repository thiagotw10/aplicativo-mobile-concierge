import React, {useState, useEffect, useRef} from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons"
import api from "../servicos/axios";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Lista from "./Lista";
import { db } from "../../firebase";
import { firebases } from "../../firebase";

export default function Resumotarefa(){
    const navigation = useNavigation();
    const refInput = useRef(false);
    const route = useRoute()

    const [botoes, setBotoes] = useState(()=>{
        return <>
        <TouchableOpacity onPress={()=> iniciarTarefa()}>
            <View  style={style.botao}> 
            <Feather name="play" size={23} color={'white'}></Feather>
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Iniciar tarefa</Text>
            </View> 
        </TouchableOpacity>
        
       
        </>
    })

    useEffect(()=>{
        navigation.addListener('focus', (e) => {
               if(route.params.conteudo.route === 'Andamento'){
                iniciarTarefa()
               } else if(route.params.conteudo.route === 'Historico'){
                    setBotoes(()=>{
                        return <>    
                        </>
                    })
               }
         })
        // navigation.addListener('beforeRemove', (e) => {
        //     const action = e.data.action;
        //     if (!refInput.current) {
        //       return
        //     }
    
        //     e.preventDefault();
    
        //     Alert.alert(
        //       'Tarefa em andamento',
        //       'Só pode voltar depois que concluir a tarefa.',
        //       [
        //         { text: "Voltar", style: 'cancel', onPress: () => {} },
        //       ]
        //     );
        // })
    },[])


  async function iniciarTarefa(){
        refInput.current = true
        if(route.params.conteudo.route != 'Andamento'){

            db.collection('concierge_tarefas').add({
                id: route.params.conteudo.id,
                status: '1',
                numero_atendimento: route.params.conteudo.numero_atendimento,
                timestamp: firebases.firestore.FieldValue.serverTimestamp()
              })

            const ativi = await api.post('celular/tarefa',{
                id: route.params.conteudo.id,
                idVerifica: '1',
                empresa: route.params.conteudo.empresa,
                usuario: route.params.conteudo.user,
            }).then((val)=>{
    
                if(val.data == 1){
                    Alert.alert('Tarefa em andamento ...')
                }
    
                setBotoes(()=>{
                    return <>
                <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}} onPress={()=> concluirTarefa()}>
                    <View  style={[style.botao, {backgroundColor: '#ecc039'}]}> 
                        <Feather name="check" size={23} color={'white'}></Feather>
                        <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Concluir tarefa</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> cancelarTarefa()}>
                     <View  style={[style.botao, {backgroundColor: '#de4c45'}]}> 
                        <Feather name="x" size={23} color={'white'}></Feather>
                        <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Cancelar tarefa</Text>
                    </View>    
                </TouchableOpacity> 
                    
                    </>
                })
            }).catch((error)=> console.log(error))
        }else{
            setBotoes(()=>{
                return <>
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}} onPress={()=> concluirTarefa()}>
                <View  style={[style.botao, {backgroundColor: '#ecc039'}]}> 
                    <Feather name="check" size={23} color={'white'}></Feather>
                    <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Concluir tarefa</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> cancelarTarefa()}>
                 <View  style={[style.botao, {backgroundColor: '#de4c45'}]}> 
                    <Feather name="x" size={23} color={'white'}></Feather>
                    <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Cancelar tarefa</Text>
                </View>    
            </TouchableOpacity> 
                
                </>
            })
        }
        
    }

    async function concluirTarefa(){
        db.collection('concierge_tarefas').add({
            id: route.params.conteudo.id,
            status: '4',
            numero_atendimento: route.params.conteudo.numero_atendimento,
            timestamp: firebases.firestore.FieldValue.serverTimestamp()
          })
        refInput.current = false
        const ativi = await api.post('celular/tarefa',{
            id: route.params.conteudo.id,
            idVerifica: '4',
            empresa: route.params.conteudo.empresa,
            usuario: route.params.conteudo.user,
        }).then((val)=>{
            if(val.data == 4){
                Alert.alert('Tarefa concluída!!')
            }

            setBotoes(()=>{
                return <> 
                <View style={[style.botao, {backgroundColor: '#53ac59'}]}> 
                    <Feather name="check" size={23} color={'white'}></Feather>
                    <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Tarefa concluída</Text>
                </View>
                </>
            })
        }).catch((error)=> console.log(error))
    }

    async function cancelarTarefa(){
        db.collection('concierge_tarefas').add({
            id: route.params.conteudo.id,
            status: '2',
            numero_atendimento: route.params.conteudo.numero_atendimento,
            timestamp: firebases.firestore.FieldValue.serverTimestamp()
        })
        refInput.current = false
        const ativi = await api.post('celular/tarefa',{
            id: route.params.conteudo.id,
            idVerifica: '2',
            empresa: route.params.conteudo.empresa,
            usuario: route.params.conteudo.user,
        }).then((val)=>{
            if(val.data == 4){
                Alert.alert('Tarefa cancelada!!')
            }
            setBotoes(()=>{
                return <> 
                <View style={[style.botao, {backgroundColor: '#de4c45'}]}> 
                    <Feather name="check" size={23} color={'white'}></Feather>
                    <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Tarefa cancelada</Text>
                </View>
                </>
            })
        }).catch((error)=> console.log(error))
    }


    return <>
    <View style={style.container}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Informações da tarefa</Text>
        <View style={style.modal}>
            <View>
                <Text style={{fontWeight: 'bold', marginBottom: 5, marginTop: 5}}>
                    Nome
                </Text>
                <Text>
                   {route.params.conteudo.nome}
                </Text>
            </View>
            <View>
                <Text style={{fontWeight: 'bold', marginBottom: 5, marginTop: 5}}>
                    Setor
                </Text>
                <Text>
                    {route.params.conteudo.setor}
                </Text>
            </View>
            <View>
                <Text style={{fontWeight: 'bold', marginBottom: 5, marginTop: 5}}>
                    Leito
                </Text>
                <Text>
                    {route.params.conteudo.leito}
                </Text>
            </View>
            <View>
                <Text style={{fontWeight: 'bold', marginBottom: 5, marginTop: 5}}>
                    Data - Hora
                </Text>
                <Text>
                {route.params.conteudo.data}
                </Text>
            </View>
            <View>
                <Text style={{fontWeight: 'bold', marginBottom: 5, marginTop: 5}}>
                    Tarefa
                </Text>
                <Text>
                    {route.params.conteudo.servico}
                </Text>
            </View>
            <View>
                <Text style={{fontWeight: 'bold', marginBottom: 5, marginTop: 5}}>
                    Nº Atendimento
                </Text>
                <Text>
                    {route.params.conteudo.numero_atendimento}
                </Text>
            </View>
        </View>
    </View>
    <View style={style.containerCard}>
        {botoes}
    </View>
    </>
}

const style = StyleSheet.create({
    container:{
        flex: 2,
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
    },

    modal:{
        marginTop: 30
    },
    containerCard:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botao:{
        backgroundColor: '#80b3ff',
        width: 170,
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 15,
        flexDirection: 'row'
    }
})