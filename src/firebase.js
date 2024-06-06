// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_API,
  authDomain: "x-web-d8d82.firebaseapp.com",
  projectId: "x-web-d8d82",
  storageBucket: "x-web-d8d82.appspot.com",
  messagingSenderId: "746195547384",
  appId: "1:746195547384:web:58bb6ef6395f65b205770d",
  measurementId: "G-N1P87ELD3R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);