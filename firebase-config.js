// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAMCbCGxcup6BYVJlP3AiHUmQUNDcxr6Ss",
  authDomain: "socialnetwork-f4c8c.firebaseapp.com",
  projectId: "socialnetwork-f4c8c",
  storageBucket: "socialnetwork-f4c8c.appspot.com",
  messagingSenderId: "527945991229",
  appId: "1:527945991229:web:42cbd8a9cfb91472b91654",
  measurementId: "G-SXVJ9G7FXS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

