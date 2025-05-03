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
      console.error("Error fetching English meaning:", err);
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
      console.error("Error fetching Telugu meaning:", err);
      setTeluguMeaning("Error fetching translation.");
      setShowTeluguMeaning(true);
      setShowMeaning(false);
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
    <div className="bg-orange-100 p-4 md:p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-700 capitalize text-center">
        {word}
      </h2>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {syllables.map((s, idx) => (
          <div key={idx} className={`px-4 py-2 rounded-lg text-lg md:text-xl font-semibold transition-all duration-300 ${
              currentIndex === idx
                ? "bg-orange-500 scale-110 text-white shadow-lg"
                : "bg-orange-200 text-gray-700"
            }`}>
            {s}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
        <button onClick={handleSpeak}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-lg">
          🔊 Speak
        </button>
        <button onClick={handleRecord}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-lg">
          🎤 {isListening ? "Listening..." : "Record"}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
        <button onClick={fetchEnglishMeaning}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
          Show English Meaning
        </button>
        <button onClick={fetchTeluguMeaning}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
          Show Telugu Meaning
        </button>
      </div>

      {showMeaning && (<p className="text-md text-green-800 font-semibold text-center px-2">{meaning}</p>)}
      {showTeluguMeaning && (<p className="text-md text-purple-700 font-semibold text-center px-2">{teluguMeaning}</p>)}

      {userSpeech && (
        <p className="text-gray-800 text-lg text-center mt-4">
          You said: <strong>{userSpeech}</strong>
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
          Score: {score} / 100
        </p>
      )}
    </div>
  );
};

export default PronouncePanel;
