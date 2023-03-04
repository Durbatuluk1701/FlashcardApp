"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const database_1 = require("./database");
const app = express();
const port = 3456;
app.listen(port, () => {
    console.log(`Server running on port #${port}`);
    const fileVal = (0, database_1.read_database)();
    console.log("DATABASE:\n", fileVal);
    const newUser = {
        username: "new_user",
        cards: [{ definition: "World", word: "Hello" }],
        name: "new userman",
        email: "test_email",
        password: "NEW PASSWORD",
    };
    (0, database_1.add_user)(newUser, fileVal);
    console.log("NEW DB\n", fileVal);
});
