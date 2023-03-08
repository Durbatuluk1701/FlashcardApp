import { User } from "../contexts";

const API_LANDING = "http://localhost:3456";

export const retrieve_user = async (
  username: string
): Promise<User | undefined> => {
  return fetch(API_LANDING + `/users/${username}`, {
    method: "GET",
  }).then((res) => res.json().then((val) => val));
};

export const create_user_function = (
  user: User,
  callback: any
): Promise<void> => {
  return fetch(API_LANDING + "/users", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      console.log(res);
      res.json().then((val) => {
        const newUser = val as User;
        callback(newUser);
      });
    })
    .catch((err) => {
      console.error("COULD NOT CONNECT TO API", err);
    })
    .finally(() => Promise.resolve);
};

export const login_user_function = (
  email: string,
  password: string,
  callback: any
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
          callback(newUser);
        });
      } else if (res.status === 401) {
        console.error("Invalid Auth and/or User not found");
      } else {
        console.error("Unknown error when trying to login");
      }
    })
    .catch((err) => {
      console.error("COULD NOT CONNECT TO API", err);
    })
    .finally(() => Promise.resolve);
};

export const get_user_set_names = (username: string): Promise<string[]> => {
  return fetch(API_LANDING + `/user_sets/${username}`).then((res) => {
    if (res.status === 200) {
      // Valid response
      res.json().then((val) => {
        console.log("Get User Set response", val);
        const sets = val as string[];
        return Promise.resolve(sets);
      });
    } else if (res.status === 401) {
      console.error("Invalid Auth and/or User not found");
    } else {
      console.error("Unknown error when trying to login");
    }
    return Promise.resolve([]);
  });
};
