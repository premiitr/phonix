import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-pink-50 to-purple-100 p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 animate-fade-in-up">
        Welcome to Phonix!
      </h1>

      <p className="mt-6 text-lg sm:text-xl text-center text-gray-700 max-w-3xl animate-fade-in-up delay-200">
        🎧 An interactive and joyful journey into English sounds for kids! <br />
        Learn how each letter is pronounced, practice with fun games, and become a sound expert!
      </p>

      <div className="mt-10 grid sm:grid-cols-3 gap-6 w-full max-w-4xl animate-fade-in-up delay-300">
        <FeatureCard
          title="🔤 Learn Phonemes"
          description="Explore all 44 English sounds with examples, colorful visuals, and fun explanations!"
        />
        <FeatureCard
          title="🗣️ Practice Speaking"
          description="Speak, get scores, and improve your pronunciation with real-time feedback!"
        />
        <FeatureCard
          title="🎮 Play & Learn"
          description="Engage with sound games and quizzes designed to make learning exciting and memorable."
        />
      </div>

      <Link to="/phonetics"
        className="mt-10 px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-300 animate-bounce">
        🚀 Start Learning Now!
      </Link>
    </div>
  );
};

const FeatureCard = ({ title, description }) => (
  <div className="bg-white rounded-xl shadow-md p-5 text-center border border-yellow-200 hover:shadow-xl transition duration-300">
    <h3 className="text-xl font-semibold text-purple-700 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;
