"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const database_1 = require("./database");
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
const port = 3456;
const local_db = (0, database_1.read_database)();
const hash_pwd = (p) => {
    return bcrypt.hashSync(p, 5);
};
const compare_pwd = (p, u) => {
    return bcrypt.compareSync(p, u.password);
};
app.post("/users", (req, res) => {
    console.log("POST REQUEST RECEIVED:", req.body);
    const user = req.body;
    // TODO: Enhance construction
    user.password = hash_pwd(user.password);
    // user.username = user.email;
    // user.cards = [];
    // user.name = user.email;
    local_db.add_user(user);
    res.json(local_db.get_user(user.username));
});
app.get("/users/:username", (req, res) => {
    const username = req.params.username;
    console.log("GET RECEIVED", username);
    const currentUser = local_db.get_user(username);
    console.log("Looked up as: ", currentUser);
    res.json(currentUser);
});
app.post("/login", (req, res) => {
    const username = req.body["username"];
    const pwd = req.body["password"];
    const local_user = local_db.get_user(username);
    if (local_user) {
        // Check password
        console.log(local_user);
        if (compare_pwd(pwd, local_user)) {
            // Matched
            res.status(200).json(local_user);
        }
        else {
            // Incorrect password
            res.status(401).json({ message: "Incorrect password" });
        }
    }
    else {
        // We do not have that user
        res.status(404).json({ message: "User not found in database" });
    }
});
app.get("/user_sets/:username", (req, res) => {
    const username = req.params.username;
    const user = local_db.get_user(username);
    if (user) {
        res.json(local_db.get_set_names(user.sets));
    }
    else {
        res.status(404).json({ message: "User not found in database" });
    }
});
app.get("/sets/:setid", (req, res) => {
    const setid = req.params.setid;
    console.log("GET SET RECEIVED", setid);
    const currentSet = local_db.get_set(setid);
    if (currentSet) {
        console.log("Looked up as: ", currentSet);
        res.json(currentSet);
    }
    else {
        res.status(400).json({ message: "Set not found in the database" });
    }
});
app.post("/sets", (req, res) => {
    // TODO: Add authentication for adding sets
    console.log("Received POST request for new-set");
    const set = req.body["set"];
    const username = req.body["username"];
    const local_user = local_db.get_user(username);
    if (local_user) {
        const uuid = local_db.add_set(set);
        local_user.sets.push(uuid);
        res.status(200).json(uuid);
    }
    else {
        // We do not have that user
        res.status(400).json({ message: "User not found in database" });
    }
});
const server = app.listen(port, () => {
    console.log(`Server running on port #${port}`);
});
// Handling Termination
const signals = ["SIGTERM", "SIGKILL", "SIGINT"];
signals.forEach((signal) => {
    process.on(signal, () => {
        server.close(() => {
            console.log(`Shutting down server due to '${signal}'\n`);
            (0, database_1.write_database)(local_db);
            process.exit(0);
        });
    });
});
