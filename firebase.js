// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import{ getFirestore } from 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFYLWAfT95sxOELRU3ofrh0TRHsDcfW4E",
  authDomain: "flashcard-saas-ba31f.firebaseapp.com",
  projectId: "flashcard-saas-ba31f",
  storageBucket: "flashcard-saas-ba31f.appspot.com",
  messagingSenderId: "923530374770",
  appId: "1:923530374770:web:977916be7d222fca4d9ceb",
  measurementId: "G-THKNZ45QJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};