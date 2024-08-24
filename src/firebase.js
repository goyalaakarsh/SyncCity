// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "syncity-48fff.firebaseapp.com",
  projectId: "syncity-48fff",
  storageBucket: "syncity-48fff.appspot.com",
  messagingSenderId: "833298836124",
  appId: "1:833298836124:web:8e8419912588e5a57c9b59"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);