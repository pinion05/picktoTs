// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRLGGQeMDgN7Ipr62dqgrj5L_CkTwmRE0",
  authDomain: "picktots.firebaseapp.com",
  projectId: "picktots",
  storageBucket: "picktots.appspot.com",
  messagingSenderId: "968660058132",
  appId: "1:968660058132:web:ba5ab626faab81e01ee701",
};

// Initialize Firebasee
export const initFbase = () => initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const authService = getAuth();
