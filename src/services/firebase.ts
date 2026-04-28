import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDemo-replace-with-real-key",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "healthsaas-demo.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "healthsaas-demo",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "healthsaas-demo.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export { signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged };
export default app;
