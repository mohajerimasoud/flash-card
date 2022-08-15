import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);

export const googleAuthProvider = new GoogleAuthProvider();

export const signinWithGoogle = () =>
  signInWithPopup(firebaseAuth, googleAuthProvider);

// signInWithPopup(firebaseAuth, googleAuthProvider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential?.accessToken;
//     // The signed-in user info.
//     const user = result.user;

//     console.log("auh result", result, credential);
//     // ...
//   })
//   .catch((error) => {
//     console.log("google login error");
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });
