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

type Database = {
  [users: Username]: User;
};

import fs = require("fs");

const database_file = "./temp_database.json";

/**
 * Updates the database by adding user (modifies in place)
 */
export const add_user = (u: User, d: Database): void => {
  // Updates database with user u
  d[u.username] = u;
  fs.writeFileSync(database_file, JSON.stringify(d, null, "\t"));
};

export const read_database = (): Database => {
  const fileStr: string = fs.readFileSync(database_file, "utf-8");
  return JSON.parse(fileStr);
};
