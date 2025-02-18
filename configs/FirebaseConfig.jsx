// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "logo-19a25.firebaseapp.com",
  projectId: "logo-19a25",
  storageBucket: "logo-19a25.firebasestorage.app",
  messagingSenderId: "604452224472",
  appId: "1:604452224472:web:095bd90112719fbd2e06ad",
  measurementId: "G-XQSW1GCY9L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)