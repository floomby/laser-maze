import { useContext, useState } from "react";
import { ServerEventsContext } from "../providers/ServerEvents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addPlayer } from "../lib/api";

const Entry: React.FC = () => {
  const [name, setName] = useState<string>("");

  const { loading } = useContext(ServerEventsContext);

  return (
    <div className="flex flex-row py-2 h-fit w-full max-w-[800px]">
      <input
        className="border border-gray-400 rounded-l-lg px-2 py-2 text-black grow min-h-[20px]"
        placeholder="Runner Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !loading && name !== "") {
            addPlayer(name);
            setName("");
          }
        }}
      />
      <button
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-r-lg pl-2 pr-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed"
        onClick={() => {
          if (!loading && name !== "") {
            addPlayer(name);
            setName("");
          }
        }}
        disabled={loading}
      >
        <FontAwesomeIcon icon={faPlus} className="h-8 translate-y-[1px]" />
      </button>
    </div>
  );
};

export default Entry;
