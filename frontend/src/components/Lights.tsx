import { startLights, stopLights } from "../lib/api";
import { AppState } from "common";
import { useContext } from "react";
import { ServerEventsContext } from "../providers/ServerEvents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";

export default function Lights() {
  const { state } = useContext(ServerEventsContext);

  return (
    <>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg py-2 px-4 disabled:opacity-30 disabled:cursor-not-allowed my-2"
        onClick={() => {
          startLights();
        }}        
      >
        <FontAwesomeIcon icon={faPlay} />
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg py-2 px-4 disabled:opacity-30 disabled:cursor-not-allowed my-2"
        onClick={() => {
          stopLights();
        }}
      >
        <FontAwesomeIcon icon={faStop} />
      </button>
    </>
  );
}
