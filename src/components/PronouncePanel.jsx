import React, { useState } from "react";

const splitSyllables = (word) => {
  const syllables = word
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .match(/[^aeiou]*[aeiou]+(?:[^aeiou]*$|[^aeiou](?=[^aeiou]))?/g);
  return syllables || [word];
};

const PronouncePanel = ({ word }) => {
  const syllables = splitSyllables(word);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isListening, setIsListening] = useState(false);
  const [userSpeech, setUserSpeech] = useState("");
  const [score, setScore] = useState(null);

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    setCurrentIndex(0);

    const interval = 400;
    syllables.forEach((_, idx) => {
      setTimeout(() => setCurrentIndex(idx), idx * interval);
    });

    setTimeout(() => {
      setCurrentIndex(-1);
    }, syllables.length * interval + 300);

    window.speechSynthesis.speak(utterance);
  };

  const handleRecord = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    setUserSpeech("");
    setScore(null);

    recognition.onresult = (e) => {
      const said = e.results[0][0].transcript.toLowerCase().trim();
      setUserSpeech(said);
      const sim = getSimilarity(word.toLowerCase(), said);
      setScore(Math.round(sim * 100));
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert("Could not recognize your speech.");
    };

    recognition.start();
  };

  const getSimilarity = (a, b) => {
    const matrix = Array.from({ length: a.length + 1 }, () =>
      Array(b.length + 1).fill(0)
    );

    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        matrix[i][j] =
          a[i - 1] === b[j - 1]
            ? matrix[i - 1][j - 1]
            : Math.min(
                matrix[i - 1][j - 1] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j] + 1
              );
      }
    }

    const dist = matrix[a.length][b.length];
    return 1 - dist / Math.max(a.length, b.length);
  };

  return (
    <div className="bg-orange-100 p-6 rounded-xl shadow-md w-full">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700 capitalize">
        {word}
      </h2>

      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {syllables.map((s, idx) => (
          <div
            key={idx}
            className={`px-4 py-2 rounded-lg text-lg font-semibold transition-all duration-300 ${
              currentIndex === idx
                ? "bg-orange-500 scale-125 text-white shadow-lg"
                : "bg-orange-200 text-gray-700"
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      <div className="flex gap-4 justify-center mb-4">
        <button
          onClick={handleSpeak}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-lg transition"
        >
          🔊 Speak
        </button>
        <button
          onClick={handleRecord}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-lg transition"
        >
          🎤 {isListening ? "Listening..." : "Record"}
        </button>
      </div>

      {userSpeech && (
        <p className="text-gray-800 text-lg">
          You said: <strong>{userSpeech}</strong>
        </p>
      )}
      {score !== null && (
        <p
          className={`text-xl font-bold mt-2 ${
            score > 80
              ? "text-green-600"
              : score > 50
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          Score: {score} / 100
        </p>
      )}
    </div>
  );
};

export default PronouncePanel;
