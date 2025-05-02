import { useState } from "react";
import PronouncePanel from "./PronouncePanel";

const Body = () => {
  const [word, setWord] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-6">
          English Pronunciation App
        </h1>
        <input type="text" value={word} onChange={(e) => setWord(e.target.value.trim())} placeholder="Type a word..."
          className="p-3 w-64 border-2 rounded-lg text-lg text-center mb-6"/>
        {word && <PronouncePanel word={word} />}
      </div>
    </div>
  );
};

export default Body;
