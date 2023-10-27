import React from "react";
import { ServerEventsProvider } from "./providers/ServerEvents";
import Entry from "./components/Entry";
import Queue from "./components/Queue";
import Status from "./components/Status";
import Reset from "./components/Reset";
import Clear from "./components/Clear";
import Lights from "./components/Lights";

const App: React.FC = () => {
  return (
    <ServerEventsProvider>
      <React.StrictMode>
        <div className="flex flex-col gap-4 items-center bg-zinc-950 min-h-screen text-white pt-1 divide-y">
          <div className="flex flex-row gap-4 w-full align-items-stretch justify-center">
            <Entry />
            <Reset />
            <Clear />
            <Lights />
          </div>
          <div className="flex flex-row gap-4 grow h-full w-full p-2 divide-x">
            <Queue />
            <Status />
          </div>
        </div>
      </React.StrictMode>
    </ServerEventsProvider>
  );
};

export default App;
