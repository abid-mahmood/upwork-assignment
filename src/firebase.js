// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf4qzbwT0-fs9hbiJ72061fj1zhAA9Iuc",
  authDomain: "assignmentfirebase-db307.firebaseapp.com",
  projectId: "assignmentfirebase-db307",
  storageBucket: "assignmentfirebase-db307.appspot.com",
  messagingSenderId: "390849373400",
  appId: "1:390849373400:web:68747187f14a8fde2023ad",
  measurementId: "G-G4FSB0X4PY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);