// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANwC0RTMHfxYtWhrpgnMdyPsSYLCi5RGE",
  authDomain: "clone-515d9.firebaseapp.com",
  projectId: "clone-515d9",
  storageBucket: "clone-515d9.appspot.com",
  messagingSenderId: "200236477751",
  appId: "1:200236477751:web:e2e3b89b0070d4d18cfeb2",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
