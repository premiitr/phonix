import { useState } from "react";
import PhonemePanel from "./PhonemePanel";

// Phonetic sounds for each letter
const alphabetSounds = {
  A: [
    { ipa: "/æ/", word: "cat" },
    { ipa: "/eɪ/", word: "cake" },
    { ipa: "/ɑː/", word: "father" },
    { ipa: "/ə/", word: "about" },
    { ipa: "/ɛ/", word: "many" },
    { ipa: "/ɒ/", word: "watch" },
    { ipa: "/ɔː/", word: "water" },
  ],
  B: [{ ipa: "/b/", word: "bat" }],
  C: [
    { ipa: "/k/", word: "cat" },
    { ipa: "/s/", word: "city" },
  ],
  D: [{ ipa: "/d/", word: "dog" }],
  E: [
    { ipa: "/ɛ/", word: "bed" },
    { ipa: "/iː/", word: "he" },
    { ipa: "/ə/", word: "problem" },
    { ipa: "/eɪ/", word: "they" },
  ],
  F: [{ ipa: "/f/", word: "fish" }],
  G: [
    { ipa: "/g/", word: "go" },
    { ipa: "/dʒ/", word: "giant" },
  ],
  H: [{ ipa: "/h/", word: "hat" }],
  I: [
    { ipa: "/ɪ/", word: "bit" },
    { ipa: "/aɪ/", word: "ice" },
    { ipa: "/iː/", word: "machine" },
    { ipa: "/ə/", word: "animal" },
  ],
  J: [{ ipa: "/dʒ/", word: "jam" }],
  K: [{ ipa: "/k/", word: "kite" }],
  L: [{ ipa: "/l/", word: "lamp" }],
  M: [{ ipa: "/m/", word: "man" }],
  N: [{ ipa: "/n/", word: "net" }],
  O: [
    { ipa: "/ɒ/", word: "hot" },
    { ipa: "/əʊ/", word: "go" },
    { ipa: "/uː/", word: "do" },
    { ipa: "/ʌ/", word: "love" },
    { ipa: "/ɔː/", word: "more" },
    { ipa: "/ə/", word: "lemon" },
  ],
  P: [{ ipa: "/p/", word: "pen" }],
  Q: [{ ipa: "/kw/", word: "queen" }],
  R: [{ ipa: "/r/", word: "red" }],
  S: [
    { ipa: "/s/", word: "sun" },
    { ipa: "/z/", word: "has" },
  ],
  T: [{ ipa: "/t/", word: "top" }],
  U: [
    { ipa: "/ʌ/", word: "cup" },
    { ipa: "/juː/", word: "use" },
    { ipa: "/uː/", word: "flute" },
    { ipa: "/ə/", word: "supply" },
    { ipa: "/ʊ/", word: "put" },
  ],
  V: [{ ipa: "/v/", word: "van" }],
  W: [{ ipa: "/w/", word: "win" }],
  X: [
    { ipa: "/ks/", word: "box" },
    { ipa: "/gz/", word: "example" },
  ],
  Y: [
    { ipa: "/j/", word: "yes" },
    { ipa: "/ɪ/", word: "myth" },
    { ipa: "/aɪ/", word: "my" },
  ],
  Z: [{ ipa: "/z/", word: "zoo" }],
};

const PhoneticApp = () => {
  const [selectedLetter, setSelectedLetter] = useState("A");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-pink-300 p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-700 mb-6">
        🎤 Learn English Letter Sounds (Phonics)
      </h1>

      {/* Buttons for letters */}
      <div className="flex overflow-x-auto mb-6 no-scrollbar">
        <div className="flex gap-2">
          {Object.keys(alphabetSounds).map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`w-12 h-12 text-xl sm:text-2xl font-bold rounded-full transition-colors duration-300 ${
                selectedLetter === letter
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white text-purple-700 border-2 border-purple-300 hover:bg-purple-100"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Phoneme Panel */}
      <div className="max-w-full sm:max-w-2xl mx-auto">
        <PhonemePanel letter={selectedLetter} sounds={alphabetSounds[selectedLetter]} />
      </div>
    </div>
  );
};

export default PhoneticApp;
