import React, { useState } from "react";
import stories from "./stories.json"; // Ensure stories are in the right path

const StoryReader = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(null);

  const speak = (text, index) => {
    setActiveWordIndex(index);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.7;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setTimeout(() => setActiveWordIndex(null), 800); // visual highlight
  };

  const speakFullStory = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(stories[currentStoryIndex].content);
    utterance.lang = "en-US";
    utterance.rate = 0.7;
    window.speechSynthesis.speak(utterance);
  };

  const currentStory = stories[currentStoryIndex];

  const words = currentStory.content.split(" ").map((word, index) => {
    const cleanWord = word.replace(/[^a-zA-Z]/g, ""); // remove punctuation
    const isActive = index === activeWordIndex;

    return (
      <span
        key={index}
        onClick={() => speak(cleanWord, index)}
        className={`cursor-pointer m-1 inline-block transition duration-300 rounded-lg px-1 ${
          isActive ? "bg-yellow-200 scale-110 text-pink-600" : "hover:text-blue-500"
        }`}
      >
        {word}{" "}
      </span>
    );
  });

  return (
    <div className="min-h-screen bg-[#FFFBEA] flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-purple-600 mb-4 font-['Comic_Sans_MS','Poppins']">
        📘 {currentStory.title}
      </h1>

      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl max-w-3xl w-full text-center leading-relaxed text-xl font-['Comic_Neue','serif'] text-gray-800">
        {words}
      </div>

      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <button
          onClick={speakFullStory}
          className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-full transition"
        >
          🔊 Read Story
        </button>

        <button
          disabled={currentStoryIndex === 0}
          onClick={() => setCurrentStoryIndex((i) => i - 1)}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full transition disabled:opacity-40"
        >
          ⬅️ Previous Story
        </button>

        <button
          disabled={currentStoryIndex === stories.length - 1}
          onClick={() => setCurrentStoryIndex((i) => i + 1)}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition disabled:opacity-40"
        >
          Next Story ➡️
        </button>
      </div>
    </div>
  );
};

export default StoryReader;
