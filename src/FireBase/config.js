// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { getStorage } from "firebase/storage";
import {getFirestore} from 'firebase/firestore'




// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC542twgBlGAdYxvRzN-YAwJVHZRF_ttis",
  authDomain: "bams-f9478.firebaseapp.com",
  projectId: "bams-f9478",
  storageBucket: "bams-f9478.appspot.com",
  messagingSenderId: "452578792175",
  appId: "1:452578792175:web:8936fa8bb2ce5282ae011a",
  measurementId: "G-Z9C6Y0XTZ3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);


