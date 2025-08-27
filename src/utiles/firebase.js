// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
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


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storageDB = getStorage(app);

const getProductInfo = async (id) => {
  const docRef = doc(db, "products", id);
  const prouductInfo = getDoc(docRef);
  return await prouductInfo;
};

const getProductBids = async (id) => {
  const bidCollectionRef = collection(db, "bids");
  const q = query(bidCollectionRef, where("productId", "==", id));
  return await getDocs(q);
};

const updateBidStatus = async (bidId, status) => {
  const bidCollectionRef = doc(db, "bids", bidId);
  const updated = await updateDoc(bidCollectionRef, { status });
  return updated;
};
const getUserBids = async (userId) => {
  const bidCollectionRef = collection(db, "bids");
  const q = query(bidCollectionRef, where("userId", "==", userId));
  const snapshot = await getDocs(q);

  // Snapshot ko array mai convert karo
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};


const getUserProducts = async (userId) => {
  const bidCollectionRef = collection(db, "products");
  const q = query(bidCollectionRef, where("createdBy", "==", userId));
  return await getDocs(q);
};

export {
  auth,
  db,
  storageDB,
  getProductInfo,
  getUserBids,
  getProductBids,
  updateBidStatus,
  getUserProducts,
};
