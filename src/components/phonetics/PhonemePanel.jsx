import React from "react";

// Helper function to say phoneme as letter-by-letter
const speakIPA = (ipa) => {
  // Remove slashes and convert to spelled characters (e.g., "/æ/" -> "ay", "/ʌ/" -> "uh")
  const ipaMap = {
    "æ": "a as in cat",
    "eɪ": "a as in cake",
    "ɑː": "ah",
    "ə": "uh",
    "ɛ": "eh",
    "ɒ": "o as in hot",
    "ɔː": "aw",
    "iː": "ee",
    "ʌ": "uh",
    "uː": "oo",
    "ʊ": "oo as in put",
    "aɪ": "eye",
    "dʒ": "j",
    "ɪ": "ih",
    "kw": "k w",
    "ks": "k s",
    "gz": "g z",
    "j": "y",
    "z": "z",
    "s": "s",
    "h": "h",
    "g": "g",
    "b": "b",
    "p": "p",
    "t": "t",
    "d": "d",
    "m": "m",
    "n": "n",
    "l": "l",
    "r": "r",
    "v": "v",
    "f": "f",
    "w": "w"
  };

  const cleaned = ipa.replace(/\//g, "");
  const text = ipaMap[cleaned] || `The sound ${cleaned}`;
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};

const PhonemePanel = ({ letter, sounds }) => {
  const handlePlay = (word, ipa) => {
    // First speak the word
    const wordUtterance = new SpeechSynthesisUtterance(word);
    wordUtterance.onend = () => {
      // Then speak the phonetic sound
      speakIPA(ipa);
    };
    speechSynthesis.speak(wordUtterance);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">
        Sounds for letter "{letter}"
      </h2>
      <div className="space-y-4 overflow-y-auto max-h-80 no-scrollbar"> {/* Scrollable container */}
        {sounds.map((sound, index) => (
          <div key={index} className="p-4 bg-purple-50 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xl font-semibold">{sound.ipa}</div>
              <div className="text-md text-gray-600">
                Example: {sound.word}
              </div>
            </div>
            <button onClick={() => handlePlay(sound.word, sound.ipa)}
              className="bg-purple-400 hover:bg-purple-500 text-white px-4 py-2 rounded-lg">
              🔊 Hear
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhonemePanel;
