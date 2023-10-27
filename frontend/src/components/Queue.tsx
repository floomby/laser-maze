import { useContext } from "react";
import { ServerEventsContext } from "../providers/ServerEvents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { removePlayer } from "../lib/api";

export default function () {
  const { queue } = useContext(ServerEventsContext);

  return (
    <div className="flex flex-col gap-2 min-w-[33vw]">
      {Object.entries(queue).map(([id, player], index) => {
        return (
          <div
            key={index}
            className="flex flex-row gap-0 p-2 border-2 border-red rounded"
          >
            <div
              onClick={() => {
                removePlayer(Number(id));
              }}
              className="hover:scale-110 transform transition-all cursor-pointer text-red-500"
            >
              <FontAwesomeIcon icon={faX} />
            </div>
            <p className="pl-1">
              {player.name}
            </p>
          </div>
        );
      })}
    </div>
  );
}
