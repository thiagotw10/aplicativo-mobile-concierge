import React, { useEffect, useRef, useState } from 'react';
import api from "../servicos/axios";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons"
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
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


  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });


  export default function Login(){
    const navigation = useNavigation();
    const [empresa, setEmpresa] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const route = useRoute();


  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => { setExpoPushToken(token)});

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


   async function enviarLogin(){
        if(email == '' || senha == '' || empresa == ''){
            return Alert.alert('Preencha pfvr')
        }

       await api.post('login/celular/'+empresa,{
            email: email,
            password: senha,
            token: expoPushToken
        }).then((val)=>{
            navigation.navigate('Tarefas', {id: val.data.empresa_id, nome: val.data.titulo, fundo: val.data.fundo, user: val.data.id})
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
                <Text style={{color: 'white', fontSize: 40, bottom: 120}}>3wings</Text>
                <View style={styles.inputDiv}>
                  <Feather name="briefcase" size={30} color={'#fff'}/>  
                  <TextInput
                    style={styles.input}
                    placeholder="Empresa"
                    keyboardType="empresa-address"
                    textContentType="empresaAddress"
                    autoCapitalize="none"
                    autoCompleteType="empresa"
                    autoCorrect={false}
                    onChangeText={(empresa) => {setEmpresa(empresa)}}
                    value={empresa}
                  />
                </View>
                <View style={styles.inputDiv}>
                  <Feather name="user" size={30} color={'#fff'}/> 
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
                </View>
                <View style={styles.inputDiv}>
                  <Feather name="lock" size={30} color={'#fff'}/> 
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
                </View>
                  <TouchableOpacity onPress={()=>enviarLogin()} style={styles.buttonSubmit}>
                    <Text style={styles.submitText}>Acessar</Text>
                  </TouchableOpacity>
              </KeyboardAvoidingView>
            </>
       )
    }


    async function registerForPushNotificationsAsync() {
        let token;
      
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log('token '+token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        return token;
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

    inputDiv:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        backgroundColor: 'black',
        borderRadius: 10,
        width: '80%'
    },  
  
    input: {
      backgroundColor: 'black',
      width: '70%',
      color: 'white',
      fontSize: 22,
      borderRadius: 7,
      padding: 10,
      border: 'none',
    },
  
    buttonSubmit: {
      backgroundColor: '#59BFFF',
      width: '60%',
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