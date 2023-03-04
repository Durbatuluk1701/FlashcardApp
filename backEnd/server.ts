import express = require("express");
import { add_user, read_database, User } from "./database";

const app = express();
const port: number = 3456;

app.listen(port, () => {
  console.log(`Server running on port #${port}`);
  const fileVal = read_database();
  console.log("DATABASE:\n", fileVal);
  const newUser: User = {
    username: "new_user",
    cards: [{ definition: "World", word: "Hello" }],
    name: "new userman",
    email: "test_email",
    password: "NEW PASSWORD",
  };
  add_user(newUser, fileVal);
  console.log("NEW DB\n", fileVal);
});
