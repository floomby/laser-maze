import { type ServerMessage, type Player } from "common";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface ServerEventsProviderProps {
  loading: boolean;
  queue: { [id: number]: Player };
  current: (Player & { id: number }) | null;
}

export const ServerEventsContext = createContext<ServerEventsProviderProps>({
  loading: true,
  queue: {},
  current: null,
});

interface ServerEventsProps {
  children: ReactNode;
}

export const ServerEventsProvider: React.FC<ServerEventsProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
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
      loading && setLoading(false);
      const message = JSON.parse(event.data) as ServerMessage;
      switch (message.type) {
        case "appState":
          console.log("Received state update:", message);
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
        loading,
        queue,
        current,
      }}
    >
      {children}
    </ServerEventsContext.Provider>
  );
};
