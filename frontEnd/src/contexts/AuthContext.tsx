import React from "react";
import { login_user_function, SetID, Username } from "../utils";

export type User = {
  username: Username;
  name: string;
  email: string;
  password: string;
  sets: SetID[];
};

type Auth = {
  authenticated: User | undefined;
  updateAuth: (email: string, password: string) => Promise<Res<bool>>;
  setAuth: (u: User) => void;
  logOut: () => void;
};

const defaultAuth: Auth = {
  logOut: () => console.error("DEFAULT AUTH CONTEXT BEING USED"),
  authenticated: undefined,
  updateAuth: () => Promise.reject("DEFAULT AUTH CONTEXT BEING USED"),
  setAuth: () => console.error("DEFAULT AUTH CONTEXT BEING USED"),
};

export const AuthContext = React.createContext(defaultAuth);

const retrieve_auth_local = (): User | undefined => {
  console.log("LOCAL STUFF");
  // TODO: Unlock later
  const local_user = undefined; // localStorage.getItem("user_auth");
  if (local_user) {
    return JSON.parse(local_user);
  } else {
    return undefined;
  }
};

const set_auth_local = (u: User): void => {
  console.log("SETTING LOCAL", u);
  // TODO: Unlock later
  // localStorage.setItem("user_auth", JSON.stringify(u));
};

export const AuthProvider = (props: React.PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<
    User | undefined
  >(undefined);

  React.useEffect(() => {
    setIsAuthenticated(retrieve_auth_local());
  }, []);

  React.useEffect(() => {
    isAuthenticated && set_auth_local(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        logOut: () => setIsAuthenticated(undefined),
        authenticated: isAuthenticated,
        updateAuth: (email, password) =>
          login_user_function(email, password, setIsAuthenticated),
        setAuth: (u: User) => setIsAuthenticated(u),
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
