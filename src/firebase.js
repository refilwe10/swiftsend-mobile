// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCU9rdheF7VUq_VQrqxHU-C7N0eB39ekmg",
  authDomain: "swiftsend-app.firebaseapp.com",
  projectId: "swiftsend-app",
  storageBucket: "swiftsend-app.firebasestorage.app",
  messagingSenderId: "536310536387",
  appId: "1:536310536387:web:ce5a05215b0f6e604aea76",
  measurementId: "G-D2ST9Y0Y93"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();