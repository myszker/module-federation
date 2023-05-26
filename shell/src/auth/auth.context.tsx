import { createContext, useContext } from "react";

interface AuthContextValues {
  token?: string;
}

const AppAuthContext = createContext<AuthContextValues | undefined>(undefined);

AppAuthContext.displayName = "AuthContext";

const useAppAuth = () => {
  const context = useContext(AppAuthContext);

  if (!context) {
    throw new Error("useAppAuth must be used within a <AuthProvider />");
  }

  return context;
};

export { AppAuthContext, AuthContextValues, useAppAuth };
