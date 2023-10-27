import { reset } from "../lib/api";
import { useContext } from "react";
import { ServerEventsContext } from "../providers/ServerEvents";

export default function Reset() {
  const { current } = useContext(ServerEventsContext);

  return (
    <button
      className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-lg py-2 px-4 disabled:opacity-30 disabled:cursor-not-allowed my-2"
      onClick={() => {
        reset();
      }}
      disabled={!!current}
    >
      Reset Maze
    </button>
  );
}
