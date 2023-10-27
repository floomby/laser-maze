import { type ServerMessage, AppState, type Player } from "common";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface ServerEventsProviderProps {
  state: AppState;
  queue: { [id: number]: Player };
  current: (Player & { id: number }) | null;
}

export const ServerEventsContext = createContext<ServerEventsProviderProps>({
  state: AppState.LOADING,
  queue: {},
  current: null,
});

interface ServerEventsProps {
  children: ReactNode;
}

export const ServerEventsProvider: React.FC<ServerEventsProps> = ({
  children,
}) => {
  const [state, setState] = useState<AppState>(AppState.LOADING);
  const [queue, setQueue] = useState<{ [id: number]: Player }>({});
  const [current, setCurrent] = useState<(Player & { id: number }) | null>(
    null
  );

  useEffect(() => {
    // Create an EventSource connection to the server's /events endpoint
    const eventSource = new EventSource(
      `http://${window.location.hostname}:${
        import.meta.env.VITE_BACKEND_PORT
      }/events`
    );

    eventSource.onmessage = (event: MessageEvent<string>) => {
      const message = JSON.parse(event.data) as ServerMessage;
      switch (message.type) {
        case "appState":
          console.log("Received state update:", message);
          setState(message.state);
          setQueue(message.queue);
          setCurrent(message.current);
          break;
        default:
          console.error("Unknown message type:", message.type);
          break;
      }
    };

    // Clean up the event source when the component is unmounted
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <ServerEventsContext.Provider
      value={{
        state,
        queue,
        current,
      }}
    >
      {children}
    </ServerEventsContext.Provider>
  );
};
