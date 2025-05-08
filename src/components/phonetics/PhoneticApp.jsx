import { useState } from "react";
import PhonemePanel from "./PhonemePanel";

// Phonetic sounds for each letter
const alphabetSounds = {
  A: [
    { ipa: "/æ/", word: "cat", audio: "short_a" },
    { ipa: "/eɪ/", word: "cake", audio: "long_a" },
    { ipa: "/ɑː/", word: "father", audio: "ar_sound" },
    { ipa: "/ə/", word: "about", audio: "u_sound" },
    { ipa: "/ɛ/", word: "many", audio: "short_e" },
    { ipa: "/ɒ/", word: "watch", audio: "short_o" },
    { ipa: "/ɔː/", word: "water", audio: "aw_sound" }
  ],
  B: [{ ipa: "/b/", word: "bat", audio: "b_sound" }],
  C: [
    { ipa: "/k/", word: "cat", audio: "k_sound" },
    { ipa: "/s/", word: "city", audio: "s_sound" }
  ],
  D: [{ ipa: "/d/", word: "dog", audio: "d_sound" }],
  E: [
    { ipa: "/ɛ/", word: "bed", audio: "short_e" },
    { ipa: "/iː/", word: "he", audio: "long_e" },
    { ipa: "/ə/", word: "problem", audio: "u_sound" },
    { ipa: "/eɪ/", word: "they", audio: "long_a" }
  ],
  F: [{ ipa: "/f/", word: "fish", audio: "f_sound" }],
  G: [
    { ipa: "/g/", word: "go", audio: "g_sound" },
    { ipa: "/dʒ/", word: "giant", audio: "j_sound" }
  ],
  H: [{ ipa: "/h/", word: "hat", audio: "h_sound" }],
  I: [
    { ipa: "/ɪ/", word: "bit", audio: "short_i" },
    { ipa: "/aɪ/", word: "ice", audio: "long_i" },
    { ipa: "/iː/", word: "machine", audio: "long_e" },
    { ipa: "/ə/", word: "animal", audio: "u_sound" }
  ],
  J: [{ ipa: "/dʒ/", word: "jam", audio: "j_sound" }],
  K: [{ ipa: "/k/", word: "kite", audio: "k_sound" }],
  L: [{ ipa: "/l/", word: "lamp", audio: "l_sound" }],
  M: [{ ipa: "/m/", word: "man", audio: "m_sound" }],
  N: [
    { ipa: "/n/", word: "net", audio: "n_sound" },
    { ipa: "/ŋ/", word: "song", audio: "ng_sound" }
  ],
  O: [
    { ipa: "/ɒ/", word: "hot", audio: "short_o" },
    { ipa: "/əʊ/", word: "go", audio: "long_o" },
    { ipa: "/uː/", word: "do", audio: "oo_sound" },
    { ipa: "/ʌ/", word: "love", audio: "short_u" },
    { ipa: "/ɔː/", word: "more", audio: "or_sound" },
    { ipa: "/ə/", word: "lemon", audio: "u_sound" }
  ],
  P: [{ ipa: "/p/", word: "pen", audio: "p_sound" }],
  Q: [{ ipa: "/kw/", word: "queen", audio: "kw_sound" }], // This needs to be added if the file exists
  R: [
    { ipa: "/r/", word: "red", audio: "r_sound" },
    { ipa: "/ɚ/", word: "mother", audio: "r_sound" },
    { ipa: "/ɑr/", word: "car", audio: "ar_sound" },
    { ipa: "/ɔr/", word: "for", audio: "or_sound" },
    { ipa: "/ɛr/", word: "air", audio: "air_sound" }
  ],
  S: [
    { ipa: "/s/", word: "sun", audio: "s_sound" },
    { ipa: "/z/", word: "has", audio: "z_sound" },
    { ipa: "/ʃ/", word: "shoe", audio: "sh_sound" }
  ],
  T: [
    { ipa: "/t/", word: "top", audio: "t_sound" },
    { ipa: "/ʧ/", word: "chair", audio: "ch_sound" }
  ],
  U: [
    { ipa: "/ʌ/", word: "cup", audio: "short_u" },
    { ipa: "/juː/", word: "use", audio: "long_u" },
    { ipa: "/uː/", word: "flute", audio: "oo_sound" },
    { ipa: "/ə/", word: "supply", audio: "u_sound" },
    { ipa: "/ʊ/", word: "put", audio: "short_u" }
  ],
  V: [{ ipa: "/v/", word: "van", audio: "v_sound" }],
  W: [{ ipa: "/w/", word: "win", audio: "w_sound" }],
  X: [
    { ipa: "/ks/", word: "box", audio: "x_sound" }, // Rename or create if needed
    { ipa: "/gz/", word: "example", audio: "x_sound" } // Same as above
  ],
  Y: [
    { ipa: "/j/", word: "yes", audio: "y_sound" },
    { ipa: "/ɪ/", word: "myth", audio: "short_i" },
    { ipa: "/aɪ/", word: "my", audio: "long_i" }
  ],
  Z: [
    { ipa: "/z/", word: "zoo", audio: "z_sound" },
    { ipa: "/ʒ/", word: "vision", audio: "zh_sound" }
  ],
  Others: [
    { ipa: "/ð/", word: "this", audio: "voiced_th" },
    { ipa: "/θ/", word: "thin", audio: "unvoiced_th" },
    { ipa: "/ɔɪ/", word: "boy", audio: "oi_sound" },
    { ipa: "/aʊ/", word: "how", audio: "ow_sound" }
  ]
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
            <button key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`w-12 h-12 text-xl sm:text-2xl font-bold rounded-full transition-colors duration-300 ${
                selectedLetter === letter
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white text-purple-700 border-2 border-purple-300 hover:bg-purple-100"
              }`}>
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
