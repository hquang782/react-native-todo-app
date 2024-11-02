import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA9jd8eRzI2ozWCRmwOlk0WRMrHNTxmVww",
  authDomain: "beta88-eb62e.firebaseapp.com",
  projectId: "beta88-eb62e",
  storageBucket: "beta88-eb62e.appspot.com",
  messagingSenderId: "214666591013",
  appId: "1:214666591013:web:048b33e91b08537feab8cc",
  measurementId: "G-BZ4718LT1C",
};

export const TODO_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(TODO_APP);
export const FIREBASE_AUTH = getAuth(TODO_APP);
