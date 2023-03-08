"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.read_database = exports.write_database = void 0;
const fs = require("fs");
const UUID = require("uuid");
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
const write_database = (d) => {
    const microDb = { users: d.users, sets: d.sets };
    fs.writeFileSync(database_file, JSON.stringify(microDb, null, "\t"));
};
exports.write_database = write_database;
/**
 * Reads in the database of users, then adds relevant formulas around it
 */
const read_database = () => {
    const fileStr = fs.readFileSync(database_file, "utf-8");
    const { users, sets } = JSON.parse(fileStr);
    const db = {
        add_user: (u) => {
            db.users[u.username] = u;
        },
        get_user: (name) => {
            return db.users[name];
        },
        get_user_sets: (name) => {
            return db.users[name].sets;
        },
        get_set_names: (sl) => {
            return sl.map((id) => db.sets[id].name);
        },
        // add_card: (u: User, c: Flashcard) => {
        //   patch_array(db.users[u.username].cards, c, "word");
        // },
        get_set: (sid) => {
            return db.sets[sid];
        },
        add_set: (s) => {
            const uuid = UUID.v4();
            db.sets[uuid] = s;
        },
        add_to_set: (s, c) => {
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
exports.read_database = read_database;
