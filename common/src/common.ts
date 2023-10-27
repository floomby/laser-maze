export enum AppState {
  LOADING = "loading",
  READY = "ready",
  STAND_BY = "standBy",
  RUNNING = "running",
}

export type Player = {
  name: string;
};

export type AppStateMessage = {
  state: AppState;
  queue: { [id: number]: Player };
  current: (Player & { id: number }) | null;
};

export type ServerMessage = {
  type: "appState";
} & AppStateMessage;
