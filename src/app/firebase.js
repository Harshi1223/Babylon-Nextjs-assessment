// Import Firebase libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config (copy from Firebase Console)
const firebaseConfig = {
  apiKey: "",
  authDomain: "login-app-ca5a0.firebaseapp.com",
  projectId: "login-app-ca5a0",
  storageBucket: "login-app-ca5a0.firebasestorage.app",
  messagingSenderId: "576481095157",
  appId: "1:576481095157:web:f97a9c7995462dc096c4bc",
  measurementId: "G-KRNZX8G27K"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
