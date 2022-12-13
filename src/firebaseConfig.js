// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyADUQbgsjvf7A2puRmh2YYJJnOpHLr-Pvs",
  authDomain: "chat-app-99af3.firebaseapp.com",
  projectId: "chat-app-99af3",
  storageBucket: "chat-app-99af3.appspot.com",
  messagingSenderId: "1076623182456",
  appId: "1:1076623182456:web:b6a3fc22c9641ec022bb8d",
  measurementId: "G-KP9M0NTVQH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
