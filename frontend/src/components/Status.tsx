import { useContext } from "react";
import { ServerEventsContext } from "../providers/ServerEvents";
import Spinner from "./Spinner";
import Running from "./Running";

export default function Status() {
  const { current, loading, queue } = useContext(ServerEventsContext);

  return (
    <div className="flex flex-col gap-2 grow">
      {(() => {
        if (loading) {
          return (
            <div className="flex w-full h-full justify-center items-center">
              <Spinner className="h-32 w-32" />
            </div>
          );
        }

        if (!!current) {
          return (
            <div className="flex w-full h-full justify-center items-center">
              <Running />
            </div>
          );
        }

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
      })()}
    </div>
  );
}
