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

const API_LANDING = "http://localhost:3456";

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

  // const create_user_function = (
  //   email: string,
  //   password: string
  // ): Promise<void> => {
  //   console.log(email, password);
  //   return fetch(API_LANDING, {
  //     method: "POST",
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email: email, password: password }),
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       res.json().then((val) => {
  //         const newUser = val as User;
  //         setIsAuthenticated(newUser);
  //       });
  //     })
  //     .catch((err) => {
  //       console.error("COULD NOT CONNECT TO API", err);
  //     })
  //     .finally(() => Promise.resolve);
  // };

  const login_user_function = (
    email: string,
    password: string
  ): Promise<void> => {
    console.log("LOGGING IN USER");
    return fetch(API_LANDING + "/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, password: password }),
    })
      .then((res) => {
        if (res.status === 200) {
          // Valid response
          res.json().then((val) => {
            const newUser = val as User;
            setIsAuthenticated(newUser);
          });
        } else if (res.status === 401) {
          console.error("Invalid Auth");
        } else if (res.status === 404) {
          console.log("Patient not found");
        } else {
          console.error("Unknown error when trying to login");
        }
      })
      .catch((err) => {
        console.error("COULD NOT CONNECT TO API", err);
      })
      .finally(() => Promise.resolve);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: isAuthenticated,
        updateAuth: login_user_function,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
