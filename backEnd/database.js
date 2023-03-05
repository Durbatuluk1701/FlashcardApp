"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.read_database = exports.write_database = void 0;
const fs = require("fs");
/**
 * In place patches an array
 */
const patch_array = (ts, t, key) => {
    const ind = ts.findIndex((val) => {
        return val[key] === t[key];
    });
    if (ind === -1) {
        // We are adding a completely new one
        ts.push(t);
    }
    else {
        // We are updating an element
        ts[ind] = t;
    }
    return ts;
};
const database_file = "./temp_database.json";
const write_database = (d) => {
    fs.writeFileSync(database_file, JSON.stringify(d.users, null, "\t"));
};
exports.write_database = write_database;
/**
 * Reads in the database of users, then adds relevant formulas around it
 */
const read_database = () => {
    const fileStr = fs.readFileSync(database_file, "utf-8");
    const users = JSON.parse(fileStr);
    const db = {
        add_user: (u) => {
            db.users[u.username] = u;
        },
        get_user: (name) => {
            return db.users[name];
        },
        users: users,
        add_card: (u, c) => {
            patch_array(db.users[u.username].cards, c, "word");
        },
        get_cards: (u) => {
            return db.users[u].cards;
        },
        get_tagged_cards: (u, t) => {
            const cards = db.get_cards(u);
            return cards.filter((card) => t in card.tags);
        },
    };
    return db;
};
exports.read_database = read_database;
