import sqlite3 from "sqlite3";

import env from "./env.js";

export type Completion = {
  id: number;
  time: number; // in milliseconds
  name: string;
};

const db = new sqlite3.Database(env.DB_PATH, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log(`Database loaded (${env.DB_PATH})`);
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS completions (
      id INTEGER PRIMARY KEY,
      time INTEGER NOT NULL,
      name TEXT NOT NULL,
      createdAt TEXT DEFAULT (datetime('now'))
    )
  `);
});

export const writeCompletion = (completion: Omit<Completion, "id">) => {
  db.run(
    "INSERT INTO completions (time, name) VALUES (?, ?)",
    completion.time,
    completion.name
  );
};

export const getLeaders = (count: number) => {
  return new Promise<Completion[]>((resolve, reject) => {
    db.all(
      "SELECT * FROM completions ORDER BY time ASC LIMIT ?",
      count,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as Completion[]);
        }
      }
    );
  });
};

export const getLatest = (count: number) => {
  return new Promise<Completion[]>((resolve, reject) => {
    db.all(
      "SELECT * FROM completions ORDER BY createdAt DESC LIMIT ?",
      count,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as Completion[]);
        }
      }
    );
  });
};

export const clearDatabase = () => {
  db.run("DELETE FROM completions");
};
