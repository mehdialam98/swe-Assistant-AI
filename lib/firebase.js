// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWd3uVgfEcTj0lVEZ-kuJ2x-NCVGjwVDk",
  authDomain: "cs-assistant-a53eb.firebaseapp.com",
  projectId: "cs-assistant-a53eb",
  storageBucket: "cs-assistant-a53eb.appspot.com",
  messagingSenderId: "734797693545",
  appId: "1:734797693545:web:245ab015478bc3658b18f8",
  measurementId: "G-8ZHLD51J9J"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, provider, signInWithPopup, signOut };