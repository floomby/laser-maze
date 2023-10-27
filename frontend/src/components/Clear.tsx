import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { clearData } from "../lib/api";

export default function () {
  const [shown, setShown] = useState(false);

  return (
    <>
      <button
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-lg py-2 px-4 disabled:opacity-30 disabled:cursor-not-allowed my-2"
        onClick={() => {
          setShown(true);
        }}
      >
        Clear Data
      </button>
      <AnimatePresence>
        {shown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-80 ring-4 ring-indigo-400"
          >
            <div className="flex flex-col items-center justify-center rounded-2xl p-4 bg-zinc-200">
              <div className="flex w-full flex-col items-center justify-center gap-4">
                <p className="text-lg font-semibold text-black">
                  {"Clear All Data (no undo)"}
                </p>
              </div>
              <div className="flex flex-row gap-2 pt-4">
                <button
                  className="bg-indigo-400 hover:bg-indigo-500 text-black font-bold rounded-lg py-2 px-4 disabled:opacity-30 disabled:cursor-not-allowed my-2"
                  onClick={() => {
                    setShown(false);
                  }}
                >
                  Back
                </button>
                <button
                  className="bg-red-400 hover:bg-red-500 text-black font-bold rounded-lg py-2 px-4 disabled:opacity-30 disabled:cursor-not-allowed my-2"
                  onClick={() => {
                    clearData();
                    setShown(false);
                  }}
                >
                  Confirm Clear
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
