import { createContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { useContext } from "react";
import { auth } from "../firebaseConfig";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
