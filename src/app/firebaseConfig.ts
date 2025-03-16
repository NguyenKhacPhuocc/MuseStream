// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCgbi84SXGmoVlQo9ATigNqbjsjLtwIx4",
  authDomain: "project-5-30059.firebaseapp.com",
  databaseURL: "https://project-5-30059-default-rtdb.firebaseio.com",
  projectId: "project-5-30059",
  storageBucket: "project-5-30059.firebasestorage.app",
  messagingSenderId: "183797207599",
  appId: "1:183797207599:web:e264007b4673044d282cda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const dbFirebase = getDatabase(app);

export const authFirebase = getAuth(app);