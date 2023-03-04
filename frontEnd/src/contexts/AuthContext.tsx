import React from "react";

type Auth = {
  authenticated: boolean;
  updateAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultAuth: Auth = {
  authenticated: false,
  updateAuth: () => {
    console.error("DEFAULT AUTH CONTEXT BEING USED");
  },
};

export const AuthContext = React.createContext(defaultAuth);

export const AuthProvider = (props: React.PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <AuthContext.Provider
      value={{ authenticated: isAuthenticated, updateAuth: setIsAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
