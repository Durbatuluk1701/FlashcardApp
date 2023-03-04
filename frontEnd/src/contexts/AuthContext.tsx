import React from "react";

type Username = string;

type Flashcards = {
  word: string;
  definition: string;
};

export type User = {
  username: Username;
  name: string;
  email: string;
  password: string;
  cards: Flashcards[];
};

type Auth = {
  authenticated: User | undefined;
  updateAuth: (email: string, password: string) => Promise<void>;
};

const defaultAuth: Auth = {
  authenticated: undefined,
  updateAuth: () => Promise.reject("DEFAULT AUTH CONTEXT BEING USED"),
};

const API_LANDING = "https://localhost:3456";

export const AuthContext = React.createContext(defaultAuth);

export const AuthProvider = (props: React.PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<
    User | undefined
  >(undefined);

  const authFn = (email: string, password: string): Promise<void> => {
    console.log(email, password);
    return fetch(API_LANDING)
      .then((res) => {
        res.json().then((val) => {
          const newUser = val as User;
          setIsAuthenticated(newUser);
        });
      })
      .catch((err) => {
        console.error("COULD NOT CONNECT TO API", err);
      })
      .finally(() => Promise.resolve);
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: isAuthenticated, updateAuth: authFn }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
