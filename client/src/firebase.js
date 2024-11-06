// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "easyhomefinder-4ed35.firebaseapp.com",
  projectId: "easyhomefinder-4ed35",
  storageBucket: "easyhomefinder-4ed35.firebasestorage.app",
  messagingSenderId: "887898595375",
  appId: "1:887898595375:web:c1523267aeaee6338b26da",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
