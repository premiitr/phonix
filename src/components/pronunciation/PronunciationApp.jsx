import { useState } from "react";
import PronouncePanel from "./PronouncePanel";

const PronunciationApp = () => {
  const [word, setWord] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-100 px-4 py-12">
      <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-2xl text-center border border-pink-200 animate-fade-in-up">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          English Pronunciation App
        </h1>
        
        <p className="text-md sm:text-lg text-gray-600 mb-4">
          Type a word below and hear how it’s pronounced!
        </p>

        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value.trim())}
          placeholder="e.g. elephant"
          className="p-4 w-full sm:w-4/5 border-2 border-purple-200 rounded-full text-lg text-center shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-200 mb-6"
        />

        {word && (
          <div className="mt-6">
            <PronouncePanel word={word} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PronunciationApp;
