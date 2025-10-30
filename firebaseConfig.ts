

// src/config/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAaI-bvSXddWBePYlQxZk78qn1L2da3FY8",
  authDomain: "react-native-dm.firebaseapp.com",
  projectId: "react-native-dm",
  storageBucket: "react-native-dm.firebasestorage.app",
  messagingSenderId: "718070565957",
  appId: "1:718070565957:android:bce9544431a2ffb665672c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

