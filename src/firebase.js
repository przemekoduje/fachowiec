// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth,signOut, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCkByueQkJESHF2mNWbK5b_TEgCtsps90c",
  authDomain: "fachowiec-d0fd0.firebaseapp.com",
  projectId: "fachowiec-d0fd0",
  storageBucket: "fachowiec-d0fd0.firebasestorage.app",
  messagingSenderId: "391064267739",
  appId: "1:391064267739:web:06f057729157471b9cd5fe",
  measurementId: "G-JRKJV4TY01"
};

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signOut, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged };
export const db = getFirestore(app);
export const storage = getStorage(app);
console.log("Firestore zainicjowany:", db);
