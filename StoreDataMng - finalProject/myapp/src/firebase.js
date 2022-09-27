
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCz_oR6ME6oeiqfFkIJmN3l6_ZcdW8Fitw",
  authDomain: "storedata-9a37e.firebaseapp.com",
  projectId: "storedata-9a37e",
  storageBucket: "storedata-9a37e.appspot.com",
  messagingSenderId: "24752972848",
  appId: "1:24752972848:web:e8e43faa60d3dbfbd539f5",
  measurementId: "G-9HBZ5PPR2S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore()

