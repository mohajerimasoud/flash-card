import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};
// initialize app
export const firebaseApp = initializeApp(firebaseConfig);
// initialize modules
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseFireStoreDB = getFirestore(firebaseApp);
// Google Auth
export const googleAuthProvider = new GoogleAuthProvider();
export const signinWithGoogle = () =>
  signInWithPopup(firebaseAuth, googleAuthProvider);
