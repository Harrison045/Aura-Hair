import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For a production app, these should be in a .env file
const firebaseConfig = {
  apiKey: "AIzaSyCb4Q5C_XEtZE56FQhssmXnADn2m8qV7J0",
  authDomain: "aura-haircare.firebaseapp.com",
  projectId: "aura-haircare",
  storageBucket: "aura-haircare.firebasestorage.app",
  messagingSenderId: "740828472548",
  appId: "1:740828472548:web:5842b7f52224d219f9b8f1",
  measurementId: "G-H2D6RSE306"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
