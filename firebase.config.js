// Import the functions you need from the SDKs you need
import { getApp , getApps ,initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth , GoogleAuthProvider , signInWithPopup, signInWithEmailAndPassword} from 'firebase/auth'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyDD_iM3zmacgQ6hVi9vqwVKexxGD2a_43c",
  authDomain: "foodapp-3e4f1.firebaseapp.com",
  databaseURL: "https://foodapp-3e4f1-default-rtdb.firebaseio.com",
  projectId: "foodapp-3e4f1",
  storageBucket: "foodapp-3e4f1.appspot.com",
  messagingSenderId: "222915002539",
  appId: "1:222915002539:web:ef465bb17cce5c3bcdf7ee"
};


export const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);


export const firestore_db = getFirestore(app);
export const storage = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


provider.setCustomParameters({
    prompt : 'select_account'
  })


export const signInWithgoolgePopup = () => signInWithPopup(auth,provider);
export const signInWithemailandpassword = () => signInWithEmailAndPassword(auth, provider);




// REACT_FIREBASE_apiKey= "AIzaSyDD_iM3zmacgQ6hVi9vqwVKexxGD2a_43c"
// REACT_FIREBASE_authDomain= "foodapp-3e4f1.firebaseapp.com"
// REACT_FIREBASE_databaseURL= "https://foodapp-3e4f1-default-rtdb.firebaseio.com"
// REACT_FIREBASE_projectId= "foodapp-3e4f1"
// REACT_FIREBASE_storageBucket= "foodapp-3e4f1.appspot.com"
// REACT_FIREBASE_messagingSenderId= "222915002539"
// REACT_FIREBASE_appId= "1:222915002539:web:ef465bb17cce5c3bcdf7ee"