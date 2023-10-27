import * as z from "zod";
import { config } from "dotenv";

config({ path: "../.env" });

const schema = z.object({
  VITE_BACKEND_PORT: z.number().int().positive().min(1).max(65535),
  SERIAL_PORT_PATH: z.string(),
  LEADERBOARD_FILE_PATH: z.string(),
  LATEST_FILE_PATH: z.string(),
  USE_CORS: z.coerce.boolean(),
  DB_PATH: z.string(),
  COMPANION_AUTHORITY: z.string(),
  COMPANION_PAGE: z.number(),
  COMPANION_START: z.number(),
  COMPANION_TRIPPED: z.number(),
  COMPANION_SUCCESS: z.number(),
  COMPANION_HALFWAY: z.number(),
  COMPANION_START_LIGHTS: z.number(),
  COMPANION_STOP_LIGHTS: z.number(),
});

const env = {
  ...process.env,
  VITE_BACKEND_PORT: Number(process.env.VITE_BACKEND_PORT),
  COMPANION_PAGE: Number(process.env.COMPANION_PAGE),
  COMPANION_START: Number(process.env.COMPANION_START),
  COMPANION_TRIPPED: Number(process.env.COMPANION_TRIPPED),
  COMPANION_SUCCESS: Number(process.env.COMPANION_SUCCESS),
  COMPANION_HALFWAY: Number(process.env.COMPANION_HALFWAY),
  COMPANION_START_LIGHTS: Number(process.env.COMPANION_START_LIGHTS),
  COMPANION_STOP_LIGHTS: Number(process.env.COMPANION_STOP_LIGHTS),
};

export default schema.parse(env);
