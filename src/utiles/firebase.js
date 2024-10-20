// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyA_q50XLfHWE4Ipkj5xHqcU-4FQD-eT0NU",
  authDomain: "auction-876da.firebaseapp.com",
  projectId: "auction-876da",
  storageBucket: "auction-876da.appspot.com",
  messagingSenderId: "106284973412",
  appId: "1:106284973412:web:5959a9d5cbffc3eafb4e71",
  measurementId: "G-VBBKZX5Q3F"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage, analytics};