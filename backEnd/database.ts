import fs = require("fs");
import UUID = require("uuid");

type Username = string;

type Tag = string;

type Flashcard = {
  word: string;
  definition: string;
  tags: Tag[];
};

type SetID = string;

type Set = {
  name: string;
  cards: Flashcard[];
};

export type User = {
  username: Username;
  name: string;
  email: string;
  password: string;
  sets: SetID[];
};

type Users = {
  [users: Username]: User;
};

type Sets = {
  [setid: SetID]: Set;
};

type StoredDb = {
  users: Users;
  sets: Sets;
};

type Database = {
  add_user: (u: User) => void;
  get_user: (name: Username) => User;
  // add_card: (u: User, c: Flashcard) => void;
  get_user_sets: (u: Username) => SetID[];
  // get_tagged_cards: (u: Username, t: Tag) => Flashcard[];

  get_set_names: (sl: SetID[]) => string[];

  get_set: (s: SetID) => Set;
  add_set: (s: Set) => void;
  add_to_set: (s: SetID, c: Flashcard) => void;

  users: Users;
  sets: Sets;
};

// interface HasKey<T> {
//   [key: string]: T;
// }

// /**
//  * In place patches an array
//  */
// const patch_array = <S, T extends HasKey<S>>(
//   ts: T[],
//   t: T,
//   key: string
// ): T[] => {
//   const ind = ts.findIndex((val) => {
//     return val[key] === t[key];
//   });
//   if (ind === -1) {
//     // We are adding a completely new one
//     ts.push(t);
//   } else {
//     // We are updating an element
//     ts[ind] = t;
//   }
//   return ts;
// };

const database_file = "./temp_database.json";

export const write_database = (d: Database) => {
  const microDb: StoredDb = { users: d.users, sets: d.sets };
  fs.writeFileSync(database_file, JSON.stringify(microDb, null, "\t"));
};

/**
 * Reads in the database of users, then adds relevant formulas around it
 */
export const read_database = (): Database => {
  const fileStr: string = fs.readFileSync(database_file, "utf-8");
  const { users, sets }: StoredDb = JSON.parse(fileStr);
  const db: Database = {
    add_user: (u: User) => {
      db.users[u.username] = u;
    },
    get_user: (name: Username) => {
      return db.users[name];
    },
    get_user_sets: (name: Username) => {
      return db.users[name].sets;
    },

    get_set_names: (sl: SetID[]) => {
      return sl.map((id) => db.sets[id].name);
    },
    // add_card: (u: User, c: Flashcard) => {
    //   patch_array(db.users[u.username].cards, c, "word");
    // },
    get_set: (sid: SetID) => {
      return db.sets[sid];
    },
    add_set: (s: Set) => {
      const uuid = UUID.v4();
      db.sets[uuid] = s;
    },
    add_to_set: (s: SetID, c: Flashcard) => {
      db.sets[s].cards.push(c);
    },
    // get_tagged_cards: (u: Username, t: Tag) => {
    //   const cards = db.get_cards(u);
    //   return cards.filter((card) => t in card.tags);
    // },

    users: users,
    sets: sets,
  };
  return db;
};
