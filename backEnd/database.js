"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.read_database = exports.add_user = void 0;
const fs = require("fs");
const database_file = "./temp_database.json";
/**
 * Updates the database by adding user (modifies in place)
 */
const add_user = (u, d) => {
    // Updates database with user u
    d[u.username] = u;
    fs.writeFileSync(database_file, JSON.stringify(d, null, "\t"));
};
exports.add_user = add_user;
const read_database = () => {
    const fileStr = fs.readFileSync(database_file, "utf-8");
    return JSON.parse(fileStr);
};
exports.read_database = read_database;
