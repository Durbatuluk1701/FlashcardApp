import fs = require("fs");

type Username = string;

type Tag = string;

type Flashcard = {
  word: string;
  definition: string;
  tags: Tag[];
};

export type User = {
  username: Username;
  name: string;
  email: string;
  password: string;
  cards: Flashcard[];
};

type Users = {
  [users: Username]: User;
};

type Database = {
  add_user: (u: User) => void;
  get_user: (name: Username) => User;
  add_card: (u: User, c: Flashcard) => void;
  get_cards: (u: Username) => Flashcard[];
  get_tagged_cards: (u: Username, t: Tag) => Flashcard[];
  users: Users;
};

interface HasKey<T> {
  [key: string]: T;
}

/**
 * In place patches an array
 */
const patch_array = <S, T extends HasKey<S>>(
  ts: T[],
  t: T,
  key: string
): T[] => {
  const ind = ts.findIndex((val) => {
    return val[key] === t[key];
  });
  if (ind === -1) {
    // We are adding a completely new one
    ts.push(t);
  } else {
    // We are updating an element
    ts[ind] = t;
  }
  return ts;
};

const database_file = "./temp_database.json";

export const write_database = (d: Database) => {
  fs.writeFileSync(database_file, JSON.stringify(d.users, null, "\t"));
};

/**
 * Reads in the database of users, then adds relevant formulas around it
 */
export const read_database = (): Database => {
  const fileStr: string = fs.readFileSync(database_file, "utf-8");
  const users = JSON.parse(fileStr);
  const db: Database = {
    add_user: (u: User) => {
      db.users[u.username] = u;
    },
    get_user: (name: Username) => {
      return db.users[name];
    },
    users: users,
    add_card: (u: User, c: Flashcard) => {
      patch_array(db.users[u.username].cards, c, "word");
    },
    get_cards: (u: Username) => {
      return db.users[u].cards;
    },
    get_tagged_cards: (u: Username, t: Tag) => {
      const cards = db.get_cards(u);
      return cards.filter((card) => t in card.tags);
    },
  };
  return db;
};
