// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdXKXyp8neks5UpY5fomXnywH1k5fxmm8",
  authDomain: "procrafted-b9a45.firebaseapp.com",
  projectId: "procrafted-b9a45",
  storageBucket: "procrafted-b9a45.appspot.com",
  messagingSenderId: "57037309479",
  appId: "1:57037309479:web:69881c906acbd452823002"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }
