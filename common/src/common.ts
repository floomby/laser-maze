// This may be a bit over engineered, we don't need the kind of extensibility that I am allowing here

export type Player = {
  name: string;
};

export type AppStateMessage = {
  queue: { [id: number]: Player };
  current: (Player & { id: number }) | null;
};

export type ServerMessage = {
  type: "appState";
} & AppStateMessage;
