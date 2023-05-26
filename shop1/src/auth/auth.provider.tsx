import React, { ReactNode, useEffect, useState } from "react";
import { AppAuthContext } from "./auth.context";
import { useAuth0 } from "@auth0/auth0-react";
import { Loader } from "../components/loader/loader";

type AppAuthProps = {
  children: ReactNode;
};

const AppAuth = ({ children }: AppAuthProps) => {
  const {
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    loginWithRedirect,
  } = useAuth0();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
      } catch (e) {
        if (!token && !isLoading) {
          loginWithRedirect();
        }
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, token, isLoading]);

  if (!isAuthenticated || !token) {
    return <Loader />;
  }

  return (
    <AppAuthContext.Provider
      value={{
        token,
      }}
    >
      {children}
    </AppAuthContext.Provider>
  );
};

export { AppAuth };
