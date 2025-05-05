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
  const [meaning, setMeaning] = useState("");
  const [teluguMeaning, setTeluguMeaning] = useState("");
  const [showMeaning, setShowMeaning] = useState(false);
  const [showTeluguMeaning, setShowTeluguMeaning] = useState(false);

  const fetchEnglishMeaning = async () => {
    if (!word || word.trim() === "") {
      setMeaning("Please enter a word.");
      return;
    }
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!res.ok) {
        setMeaning("Word not found.");
        return;
      }
      const data = await res.json();
      const engMeaning = data[0]?.meanings?.[0]?.definitions?.[0]?.definition;
      setMeaning(engMeaning || "Not available");
      setShowMeaning(true);
      setShowTeluguMeaning(false);
    } catch (err) {
      setMeaning("Error fetching meaning.");
    }
  };

  const fetchTeluguMeaning = async () => {
    if (!meaning || meaning === "Not available") {
      setTeluguMeaning("Please fetch English meaning first.");
      setShowTeluguMeaning(true);
      setShowMeaning(false);
      return;
    }
    try {
      const transRes = await fetch(`https://lingva.ml/api/v1/en/te/${meaning}`);
      const transData = await transRes.json();
      setTeluguMeaning(transData?.translation || "Not available");
      setShowTeluguMeaning(true);
      setShowMeaning(false);
    } catch (err) {
      setTeluguMeaning("Error fetching translation.");
    }
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    setCurrentIndex(0);
    const interval = 400;
    syllables.forEach((_, idx) => {
      setTimeout(() => setCurrentIndex(idx), idx * interval);
    });
    setTimeout(() => setCurrentIndex(-1), syllables.length * interval + 300);
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
    <div className="bg-gradient-to-br from-pink-50 via-orange-100 to-yellow-50 p-6 rounded-3xl shadow-xl w-full max-w-2xl mx-auto transition-all duration-500">
      <h2 className="text-3xl font-bold text-center mb-6 capitalize">
        {word}
      </h2>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {syllables.map((s, idx) => (
          <div
            key={idx}
            className={`px-5 py-2 rounded-full text-lg font-bold transition-all duration-300 ${
              currentIndex === idx
                ? "bg-pink-500 text-white scale-110 shadow-lg animate-pulse"
                : "bg-yellow-200 text-gray-800"
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
        <button
          onClick={handleSpeak}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full text-lg transition"
        >
          🔊 Speak
        </button>
        <button
          onClick={handleRecord}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full text-lg transition"
        >
          🎤 {isListening ? "Listening..." : "Record"}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
        <button
          onClick={fetchEnglishMeaning}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md"
        >
          📘 English Meaning
        </button>
        <button
          onClick={fetchTeluguMeaning}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-md"
        >
          🌐 Telugu Meaning
        </button>
      </div>

      {showMeaning && (
        <p className="text-md text-green-700 font-medium text-center mb-2">
           {meaning}
        </p>
      )}
      {showTeluguMeaning && (
        <p className="text-md text-purple-700 font-medium text-center mb-2">
           {teluguMeaning}
        </p>
      )}

      {userSpeech && (
        <p className="text-gray-800 text-lg text-center mt-4">
          🗣️ You said: <strong>{userSpeech}</strong>
        </p>
      )}
      {score !== null && (
        <p
          className={`text-xl font-bold text-center mt-2 ${
            score > 80
              ? "text-green-600"
              : score > 50
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          ✅ Pronunciation Score: {score} / 100
        </p>
      )}
    </div>
  );
};

export default PronouncePanel;
