import React, { useState, useEffect } from 'react';
import api from "../servicos/axios";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import
  {
    KeyboardAvoidingView,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
  } from 'react-native';

  export default function Login(){
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const route = useRoute();


   async function enviarLogin(){
        if(email == '' || senha == ''){
            return Alert.alert('Preencha pfvr')
        }

       await api.post('login/celular/'+route.params[0].value,{
            email: email,
            password: senha
        }).then((val)=>{
            navigation.navigate('Tarefas', {id: val.data.empresa_id, nome: route.params[0].label})
        }).catch((error) =>{ Alert.alert('Email ou senha incorreta.') })

    }

       return (
            <>
              <KeyboardAvoidingView style={styles.container}>
              {/* <View style={{alignItems: 'center', top: -70}}>
                <Image style={{width: 60, height: 60}}
                        source={{uri:'https://static.wixstatic.com/media/7bead1_f2549890dd6e4547bafe0834e12fd586~mv2.png/v1/fill/w_175,h_55,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7bead1_f2549890dd6e4547bafe0834e12fd586~mv2.png'}}
                    />
                </View> */}
                <Text style={{color: 'white', fontSize: 20, bottom: 20}}>{route.params[0].label || ''}</Text>  
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    autoCompleteType="email"
                    autoCorrect={false}
                    onChangeText={(email) => {setEmail(email)}}
                    value={email}
                  />
        
                  <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    //keyboardType="visible-password"
                    textContentType="password"
                    autoCapitalize="none"
                    autoCompleteType="password"
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={(senha) => {setSenha(senha)}}
                    value={senha}
                  />
        
                  <TouchableOpacity onPress={()=>enviarLogin()} style={styles.buttonSubmit}>
                    <Text style={styles.submitText}>Acessar</Text>
                  </TouchableOpacity>
              </KeyboardAvoidingView>
            </>
       )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#191919'
    },
   
    form: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      paddingBottom: 25
    },
  
    input: {
      backgroundColor: '#FFF',
      width: '90%',
      marginBottom: 15,
      color: '#222',
      fontSize: 22,
      borderRadius: 7,
      padding: 10
    },
  
    buttonSubmit: {
      backgroundColor: '#59BFFF',
      width: '90%',
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 7
    },
  
    submitText: {
      color: '#FFF',
      fontSize: 19
    },
  
    buttonRegister: {
      marginTop: 10
    },
  
    registerText: {
      color: '#FFF'
    }
  });