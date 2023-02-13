import firebase from 'firebase/app'
import 'firebase/firestore'

var Config = {
  apiKey: 'AIzaSyCietPAYnYTJfmryvoKFsqnjxX4NiRE_LU',
  authDomain: 'login-5410d.firebaseapp.com',
  projectId: 'login-5410d',
  storageBucket: 'login-5410d.appspot.com',
  messagingSenderId: '459541023916',
  appId: '1:459541023916:web:9f3b2844fc04a861c36309',
  measurementId: 'G-23N8SPP39Y',
}

// Initialize Firebase
firebase.initializeApp(Config)
export const db = firebase.firestore()
export const firebases = firebase
