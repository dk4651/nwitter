import { initializeApp } from "firebase/app";
import * as firebase from "firebase/app";
import {getAuth} from "firebase/auth"; //authentication을 쓰려면 선언을 해야한다 
import {getFirestore} from "firebase/firestore";
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const firebaseInstance = firebase;
export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage();
