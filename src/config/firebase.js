import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAB9onX8ZzAEQyEYMsopfGpcB787KWz7LM",
    authDomain: "register-auth-72d07.firebaseapp.com",
    projectId: "register-auth-72d07",
    storageBucket: "register-auth-72d07.appspot.com",
    messagingSenderId: "1067430219869",
    appId: "1:1067430219869:web:249ee829607de8144f3db4"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
