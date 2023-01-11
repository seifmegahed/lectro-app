import React, { useState, useEffect, useContext } from "react";
import { auth } from "../firebase-config";
import { ADMIN } from "../data/accounts";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [admin, setAdmin] = useState(false);

  const value = {
    currentUser,
    admin,
    logIn,
    logOut,
  };

  async function logIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  function logOut() {
    signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user.getIdTokenResult())
      setCurrentUser(user);
       setAdmin(ADMIN === user.uid);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
