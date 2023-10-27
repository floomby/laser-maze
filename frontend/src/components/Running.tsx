import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { ServerEventsContext } from "../providers/ServerEvents";

export default function Running() {
  const { current } = useContext(ServerEventsContext);

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-2xl font-semibold animate-pulse shadow-green-300 text-shadow">
        {current?.name}
      </p>
      <div
        className="text-blue-400"
      >
        <span className="relative flex h-32 w-32 mt-2 text-green-400">
          <FontAwesomeIcon icon={faPersonRunning} className="absolute inline-flex h-full w-full opacity-20 animate-ping" />
          <FontAwesomeIcon icon={faPersonRunning} className="relative inline-flex h-full w-full" />
        </span>
      </div>
    </div>
  );
}
