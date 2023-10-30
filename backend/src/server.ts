// This is where all the routes are as well as most of the business logic for the system

import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { type ServerMessage, type Player } from "common";

import Laser, { LaserEvent } from "./laser.js";
import env from "./env.js";
import { clearDatabase, writeCompletion } from "./db.js";
import { pressCompanionButton } from "./companion.js";
import { clearFiles, update } from "./propresenter.js";

const laser = new Laser(env.SERIAL_PORT_PATH);

laser.on(LaserEvent.TRIPPED, () => {
  pressCompanionButton(env.COMPANION_PAGE, env.COMPANION_TRIPPED);
});

laser.on(LaserEvent.HALFWAY, () => {
  pressCompanionButton(env.COMPANION_PAGE, env.COMPANION_HALFWAY);
});

laser.on(LaserEvent.FINISHED, (time: number) => {
  if (!state.currentPlayer) {
    console.error("Got finished event when not running");
    return;
  }
  writeCompletion({ time, name: state.currentPlayer.name });
  pressCompanionButton(env.COMPANION_PAGE, env.COMPANION_SUCCESS);
  update();
  state.currentPlayer = null;
  // send app state to all clients
  for (const client of state.clients) {
    sendAppState(client);
  }
});

// expired is like finished but without any of the updates
laser.on(LaserEvent.EXPIRED, () => {
  if (!state.currentPlayer) {
    console.error("Got expired event when not running");
    return;
  }

  state.currentPlayer = null;

  // send app state to all clients
  for (const client of state.clients) {
    sendAppState(client);
  }
});

laser.on(LaserEvent.STARTED, () => {
  if (Object.keys(state.playerQueue).length === 0) {
    console.error("Got started event in invalid state");
    return;
  }
  // set current player
  const id = Number(Object.keys(state.playerQueue)[0]);
  state.currentPlayer = { ...state.playerQueue[id], id };

  // delete player from queue
  delete state.playerQueue[state.currentPlayer.id];

  // send app state to all clients
  for (const client of state.clients) {
    sendAppState(client);
  }
});

const app = express();

type State = {
  // appState: AppState;
  playerQueue: { [id: number]: Player };
  currentPlayer: (Player & { id: number }) | null;
  clients: Response[];
};

const state: State = {
  playerQueue: {},
  currentPlayer: null,
  clients: [],
};

const sendAppState = (client: Response) => {
  client.write(
    `data:${JSON.stringify({
      type: "appState",
      queue: state.playerQueue,
      current: state.currentPlayer,
    } as ServerMessage)}\n\n`
  );
};

if (env.USE_CORS) {
  app.use(cors());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/events", (req: Request, res: Response) => {
  // Set headers for SSE
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // Add this client to the clients list
  state.clients.push(res);

  // Send current app state
  sendAppState(res);

  // Handle client disconnect
  req.on("close", () => {
    const index = state.clients.indexOf(res);
    if (index !== -1) {
      state.clients.splice(index, 1);
    }

    console.log(
      "client disconnected, clients remaining: ",
      state.clients.length
    );
  });
});

let idCounter = 0;

app.post("/player", (req: Request, res: Response) => {
  // add a player to the queue
  const { name } = req.body as { name: string };
  if (!name) {
    res.status(400).json({ error: "Missing name" });
    return;
  }

  const id = idCounter++;
  const player = { name };
  state.playerQueue[id] = player;

  // send app state to all clients
  for (const client of state.clients) {
    sendAppState(client);
  }

  res.status(200).json({ success: true });
});

app.post("/removePlayer", (req: Request, res: Response) => {
  const { id } = req.body as { id: number };

  // check that id is a valid number
  if (typeof id !== "number") {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  // check that id is in the queue
  if (!state.playerQueue[id]) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  // remove player from queue
  delete state.playerQueue[id];

  // send app state to all clients
  for (const client of state.clients) {
    sendAppState(client);
  }

  res.status(200).json({ success: true });
});

app.post("/reset", (req: Request, res: Response) => {
  // forcibly resets the state to READY
  state.currentPlayer = null;

  // send app state to all clients
  for (const client of state.clients) {
    sendAppState(client);
  }

  laser.reset();

  res.status(200).json({ success: true });
});

app.get("/fog/on", (req: Request, res: Response) => {
  laser.fogOn();
  res.status(200).json({ success: true });
});

app.get("/fog/off", (req: Request, res: Response) => {
  laser.fogOff();
  res.status(200).json({ success: true });
});

app.delete("/leaderboard", async (req: Request, res: Response) => {
  clearDatabase();
  await clearFiles();
  res.status(200).json({ success: true });
});

app.post("/startLights", (req: Request, res: Response) => {
  pressCompanionButton(env.COMPANION_PAGE, env.COMPANION_START_LIGHTS);
  res.status(200).json({ success: true });
});

app.post("/stopLights", (req: Request, res: Response) => {
  pressCompanionButton(env.COMPANION_PAGE, env.COMPANION_STOP_LIGHTS);
  res.status(200).json({ success: true });
});

app.listen(env.VITE_BACKEND_PORT, () => {
  console.log(`Backend listening on port ${env.VITE_BACKEND_PORT}`);
});
