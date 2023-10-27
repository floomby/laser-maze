// updating the files that pro presenter is reading
// this is pretty loosely coupled, only depending on the db

import fs from "fs";
import env from "./env.js";
import { getLatest, getLeaders } from "./db.js";

const formatTime = (milliseconds: number) => {
  const minutes = Math.floor(milliseconds / 60000);
  milliseconds %= 60000;

  const seconds = Math.floor(milliseconds / 1000);

  milliseconds %= 1000;

  // Format and return
  return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds
    .toString()
    .padStart(3, "0")}`;
};

// I wrote it such that it always grabs from the db for simplicity (to avoid bug prone code)
export const update = async () => {
  try {
    // update the leaderboard file
    const leaders = await getLeaders(10);
    const leaderData = leaders
      .map((leader) => `${leader.name},${formatTime(leader.time)}`)
      .join("\n");
    await fs.promises.writeFile(env.LEADERBOARD_FILE_PATH, leaderData);

    // update the latest file
    const latest = await getLatest(10);
    const latestData = latest
      .map((latest) => `${latest.name},${formatTime(latest.time)}`)
      .join("\n");
    await fs.promises.writeFile(env.LATEST_FILE_PATH, latestData);
  } catch (err) {
    console.error(err);
  }
};

export const clearFiles = async () => {
  try {
    await fs.promises.writeFile(env.LEADERBOARD_FILE_PATH, "");
    await fs.promises.writeFile(env.LATEST_FILE_PATH, "");
  } catch (err) {
    console.error(err);
  }
};
