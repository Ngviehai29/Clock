import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAmCKCplpkR8otU7D0BuhQf-w9qxm2yb0E",
    authDomain: "watchshop-37e53.firebaseapp.com",
    projectId: "watchshop-37e53",
    storageBucket: "watchshop-37e53.firebasestorage.app",
    messagingSenderId: "866029911853",
    appId: "1:866029911853:web:53988c1fdae9593a76dda4",
    measurementId: "G-3JVMKTRPKP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };