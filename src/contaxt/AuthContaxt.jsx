import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../utiles/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Spin } from "antd";

export  const AuthContext = createContext(); // Fixed typo from 'AuthContaxt' to 'AuthContext'

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
     isLogin: false,
     email: "",
    });
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          console.log("users Uid:");
          

          const userInfo = (await getDoc(docRef)).data();

          console.log("User info:", userInfo);

          setUser({
            isLogin: true, // Use 'isLogin' instead of 'islogin' for consistency
            ...userInfo,
          });
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      } else {
        setUser({ 
          isLogin: false,
          email: "",
         });
      }
      setLoader(false);
    });

    return subscribe; // Clean up subscription on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loader ? (
        <div className="flex h-screen justify-center items-center">
          <Spin />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
