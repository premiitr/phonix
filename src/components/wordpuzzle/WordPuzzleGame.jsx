import React, { useState, useEffect } from "react";

const WordPuzzleGame = () => {
  const wordLevels = {
  level1: [
    "cat", "dog", "sun", "bus", "bat", "cup", "fan", "hat", "pig", "rat", 
    "box", "log", "mat", "pen", "pot"
  ],
  level2: [
    "apple", "zebra", "house", "train", "boat", "plane", "garden", "beach", 
    "school", "church", "castle", "money", "music", "dancer", "book"
  ],
  level3: [
    "elephant", "giraffe", "balloon", "rainbow", "butterfly", "dinosaur", 
    "umbrella", "birthday", "computer", "television", "mountain", "unicorn", 
    "glasses", "friendship", "adventure"
  ],
};


  const levelKeys = Object.keys(wordLevels);

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [wordList, setWordList] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [completedWords, setCompletedWords] = useState([]);
  const [score, setScore] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [feedbackType, setFeedbackType] = useState(null);

  const shuffle = (word) => {
    const array = word.split("");
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    startLevel(currentLevelIndex);
  }, [currentLevelIndex]);

  const speakWord = (word, callback = null) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    if (callback) utterance.onend = callback;
    window.speechSynthesis.speak(utterance);
  };

  const startLevel = (levelIdx) => {
    const levelKey = levelKeys[levelIdx];
    const levelName = levelKey.replace("level", "Level ");
    speakWord(levelName);
    const newWords = [...wordLevels[levelKey]];
    setWordList(newWords);
    setCompletedWords([]);
    setAttemptsLeft(3);
    setGameOver(false);
    loadNewWord(newWords, []);
  };

  const loadNewWord = (words = wordList, done = completedWords) => {
    const remaining = words.filter((word) => !done.includes(word));
    if (remaining.length === 0) {
      if (currentLevelIndex + 1 < levelKeys.length) {
        setCurrentLevelIndex((prev) => prev + 1);
      } else {
        setGameOver(true);
      }
      return;
    }
    const nextWord = remaining[Math.floor(Math.random() * remaining.length)];
    setCurrentWord(nextWord);
    setShuffledLetters(shuffle(nextWord));
    setSelectedLetters([]);
  };

  const handleLetterClick = (letter, index) => {
    if (gameOver || selectedLetters.length >= currentWord.length) return;
    speakWord(letter);

    const updatedSelected = [...selectedLetters, letter];
    setSelectedLetters(updatedSelected);

    const updatedShuffled = [...shuffledLetters];
    updatedShuffled.splice(index, 1);
    setShuffledLetters(updatedShuffled);

    const formedWord = updatedSelected.join("");

    if (formedWord.length === currentWord.length) {
      if (formedWord === currentWord) {
        setScore(score + 1);
        setCompletedWords([...completedWords, currentWord]);
        setFeedbackType("correct");

        const success = new SpeechSynthesisUtterance("Well done!");
        window.speechSynthesis.speak(success);
        success.onend = () => {
          setFeedbackType(null);
          loadNewWord(wordList, [...completedWords, currentWord]);
        };
      } else {
        setFeedbackType("wrong");
        const fail = new SpeechSynthesisUtterance("Oops! Try again.");
        window.speechSynthesis.speak(fail);
        fail.onend = () => {
          const newAttempts = attemptsLeft - 1;
          setAttemptsLeft(newAttempts);
          if (newAttempts === 0) {
            setGameOver(true);
          } else {
            setFeedbackType(null);
            resetWord();
          }
        };
      }
    }
  };

  const resetWord = () => {
    setShuffledLetters(shuffle(currentWord));
    setSelectedLetters([]);
  };

  const restartGame = () => {
    setCurrentLevelIndex(0);
    setScore(0);
    startLevel(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl p-6 bg-pink-50 rounded-3xl shadow-2xl text-center animate-fade-in-up">
        <h1 className="text-3xl font-bold text-purple-600 mb-4">
          🎯 Word Puzzle Game
        </h1>

        <div className="flex justify-between mb-4 text-purple-700 font-semibold text-lg">
          <div>⭐ Score: {score}</div>
          <div>❤️ Attempts: {attemptsLeft}</div>
        </div>

        {feedbackType && (
          <div className="my-6 flex flex-col items-center justify-center">
            {feedbackType === "correct" ? (
              <div className="animate-bounce text-center">
                <p className="text-4xl mt-2 text-green-600 font-bold">
                  😊 Yay! Great Job!
                </p>
              </div>
            ) : (
              <div className="animate-shake text-center">
                <p className="text-4xl mt-2 text-red-500 font-bold">
                  😢 Try Again!
                </p>
              </div>
            )}
          </div>
        )}

        {!gameOver ? (
          <>
            <h2 className="text-lg font-bold text-blue-600 mb-2">
              Level: {levelKeys[currentLevelIndex].toUpperCase()}
            </h2>

            <div className="bg-white rounded-xl shadow-inner p-4 mb-6">
              <p className="text-gray-700 font-medium mb-2">Arrange the letters:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {shuffledLetters.map((letter, index) => (
                  <button key={index} onClick={() => handleLetterClick(letter, index)}
                    className="bg-yellow-300 hover:bg-yellow-400 px-4 py-2 rounded-full font-bold text-lg transition">
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-purple-100 p-4 rounded-xl mb-4 min-h-[48px]">
              <p className="text-purple-700 font-semibold text-lg tracking-wide">
                {selectedLetters.join("")}
              </p>
            </div>

            <div className="flex justify-center gap-4 flex-wrap mt-4">
              <button onClick={() => speakWord(currentWord)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">
                🔊 Speak Word
              </button>
              <button onClick={resetWord}
                className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-full">
                🔁 Reset
              </button>
              <button onClick={() => loadNewWord(wordList, completedWords)}
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full">
                ▶️ Skip
              </button>
            </div>
          </>
        ) : (
          <div className="text-center mt-6">
            <h2 className="text-2xl font-bold text-green-600 mb-2">🎉 Game Over!</h2>
            <p className="text-lg text-purple-700 mb-4">Your Final Score: {score}</p>
            <button
              onClick={restartGame}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full"
            >
              🔄 Restart Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordPuzzleGame;