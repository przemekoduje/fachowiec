// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth,signOut, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC079iqi5vJd18ilZe3ZcBTKwOBl5JsztU",
    authDomain: "przegladtechniczny-6b336.firebaseapp.com",
    projectId: "przegladtechniczny-6b336",
    storageBucket: "przegladtechniczny-6b336.firebasestorage.app",
    messagingSenderId: "390111216383",
    appId: "1:390111216383:web:7adf0275431877706042ca",
    measurementId: "G-PKDMDZTKX6"
  };

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signOut, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged };
export const db = getFirestore(app);
export const storage = getStorage(app);
console.log("Firestore zainicjowany:", db);
