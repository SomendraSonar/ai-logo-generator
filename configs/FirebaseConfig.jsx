// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRBASE_API_KEY,
  authDomain: "ai-logo-generator-473e8.firebaseapp.com",
  projectId: "ai-logo-generator-473e8",
  storageBucket: "ai-logo-generator-473e8.firebasestorage.app",
  messagingSenderId: "916760154912",
  appId: "1:916760154912:web:1e0ce99d85eecd52467d45",
  measurementId: "G-T2E553XLWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db=getFirestore(app);