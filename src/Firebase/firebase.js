// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEO6I4AySsCOQiSse8iTblmzPi4FrfRks",
  authDomain: "toy-world-system.firebaseapp.com",
  projectId: "toy-world-system",
  storageBucket: "toy-world-system.appspot.com",
  messagingSenderId: "1050164696391",
  appId: "1:1050164696391:web:790349ab3b1be723c36862",
  measurementId: "G-B99Z30822B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app)

export {db, auth}

