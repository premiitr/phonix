const AudioButton =({ audioUrl })=> {
    const playAudio = () => {
      const audio = new Audio(audioUrl);
      audio.play();
    };
  
    return (
      <button
        onClick={playAudio}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        🔊 Play Pronunciation
      </button>
    );
  }
  
  export default AudioButton;
  