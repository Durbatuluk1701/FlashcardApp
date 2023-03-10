import { User } from "../contexts";

export type Username = string;

export type Tag = string;

export type Flashcard = {
  word: string;
  definition: string;
  tags: Tag[];
};

export type SetID = string;

export type Set = {
  name: string;
  cards: Flashcard[];
};

export type SetNameMap = {
  setid: SetID;
  name: string;
};

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
): Promise<Res<bool>> => {
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
      return res.json().then((val) => {
        console.log(val);
        if (res.status === 200) {
          // Valid response
          const newUser = val as User;
          callback(newUser);
          return Promise.resolve<Res<bool>>({
            res: "Ok",
            val: true,
          });
        } else {
          return Promise.resolve<Res<bool>>({
            res: "Err",
            val: `Login could not be completed: ${val.message}`,
          });
        }
        // if (res.status === 401) {
        //   return Promise.resolve<Res<bool>>({
        //     res: "Err",
        //     val: "Invalid Auth and/or User not found" + val,
        //   });
        // }
      });
    })
    .catch(() => {
      return Promise.resolve<Res<bool>>({
        res: "Err",
        val: "COULD NOT CONNECT TO API",
      });
    });
};

export const get_user_set_names = (
  username: string
): Promise<Res<SetNameMap[]>> => {
  return fetch(API_LANDING + `/user_sets/${username}`).then((res) => {
    return res.json().then((val) => {
      if (res.status === 200) {
        // Valid response
        console.log("Get User Set response", val);
        const sets = val as SetNameMap[];
        return Promise.resolve<Res<SetNameMap[]>>({
          res: "Ok",
          val: sets,
        });
      } else {
        return Promise.resolve({
          res: "Err",
          val: `Get User Set Names Failed: ${val.message}`,
        });
      }
    });
  });
};

export const API_get_set = (id: SetID): Promise<Set | undefined> => {
  return fetch(API_LANDING + `/sets/${id}`).then((res) => {
    if (res.status === 200) {
      // Valid response
      return res.json().then((val) => {
        console.log(`Retrieve Set with id: ${id}; as ${val}`);
        const set = val as Set;
        return Promise.resolve(set);
      });
    } else if (res.status === 401) {
      console.error("Invalid Auth and/or User not found");
    } else {
      console.error("Unknown error when trying to login");
    }
    return Promise.resolve(undefined);
  });
};

export const API_add_set = (
  username: Username,
  // token: We need to add the auth token here at some point
  s: Set
): Promise<string | undefined> => {
  return fetch(API_LANDING + `/sets`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, set: s }),
  }).then((res) => {
    if (res.status === 200) {
      // Valid response
      return res.json().then((val) => {
        console.log("Added Set", val);
        const set_uuid = val as string;
        return Promise.resolve(set_uuid);
      });
    } else if (res.status === 401) {
      console.error("Invalid Auth and/or User not found");
    } else {
      console.error("Unknown error when trying to login");
    }
    return Promise.resolve(undefined);
  });
};
