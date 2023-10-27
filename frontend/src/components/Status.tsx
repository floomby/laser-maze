import { useContext } from "react";
import { ServerEventsContext } from "../providers/ServerEvents";
import { AppState } from "common";
import Spinner from "./Spinner";
import Running from "./Running";

export default function Status() {
  const { state, queue } = useContext(ServerEventsContext);

  return (
    <div className="flex flex-col gap-2 grow">
      {(() => {
        switch (state) {
          case AppState.LOADING:
            return (
              <div className="flex w-full h-full justify-center items-center">
                <Spinner className="h-32 w-32" />
              </div>
            );
          case AppState.READY:
            return (
              <div className="flex w-full h-full justify-center items-center">
                {Object.keys(queue).length > 0 ? (
                  <p className="text-2xl text-green-400 font-semibold animate-pulse shadow-green-300 text-shadow">
                    Maze Ready For Entry
                  </p>
                ) : (
                  <p className="text-2xl font-semibold shadow-blue-300 text-shadow">
                    Waiting For Players
                  </p>
                )}
              </div>
            );
          case AppState.RUNNING:
            return (
              <div className="flex w-full h-full justify-center items-center">
                <Running />
              </div>
            );
          default:
            return <p>Unknown state</p>;
        }
      })()}
    </div>
  );
}
