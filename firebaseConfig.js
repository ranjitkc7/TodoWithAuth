// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDff_255yuYSDxQJQXYbvFhSWsj8RiVcFM",
  authDomain: "todoapp-4c8a1.firebaseapp.com",
  projectId: "todoapp-4c8a1",
  storageBucket: "todoapp-4c8a1.firebasestorage.app",
  messagingSenderId: "693623067872",
  appId: "1:693623067872:web:4eebf2761c619301fbac85",
  measurementId: "G-3MDD2P34VE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);