// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAN4aPtuBukguunlrRCBzSQDyArDWZ5Ffw",
    authDomain: "desafio1-37966.firebaseapp.com",
    projectId: "desafio1-37966",
    storageBucket: "desafio1-37966.appspot.com",
    messagingSenderId: "594110836737",
    appId: "1:594110836737:web:8239a0c4dabdad9bba5000"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };