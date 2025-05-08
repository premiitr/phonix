import React, { useState } from "react";

const PhonemePanel = ({ letter, sounds }) => {
  const [error, setError] = useState(null);

  const handlePlay = (sound) => {
    setError(null); // Clear previous errors
    const audio = new Audio(`/phonics/${sound.audio}.mp3`);

    audio.play().catch((err) => {
      setError(`Audio not found for "${sound.ipa}"`);
    });

    audio.onended = () => {
      setTimeout(() => {
        const wordUtterance = new SpeechSynthesisUtterance(`${sound.word}`);
        wordUtterance.rate = 1;
        speechSynthesis.speak(wordUtterance);
      }, 300); // Small gap
    };

    audio.onerror = () => {
      setError(`Audio file for "${sound.ipa}" is missing or not supported.`);
    };
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">
        Sounds for letter "{letter}"
      </h2>

      {error && (
        <div className="text-red-600 mb-4 text-sm bg-red-100 px-3 py-2 rounded">
          {error}
        </div>
      )}

      <div className="space-y-4 overflow-y-auto max-h-80 no-scrollbar">
        {sounds.map((sound, index) => (
          <div key={index}
            className="p-4 bg-purple-50 rounded-xl flex items-center justify-between"
          >
            <div>
              <div className="text-xl font-semibold">{sound.ipa}</div>
              <div className="text-md text-gray-600">
                Example: {sound.word}
              </div>
            </div>
            <button onClick={() => handlePlay(sound)}
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
