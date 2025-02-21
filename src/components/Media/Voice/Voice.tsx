import { useEffect, useRef, useState } from "react";
import PlayIcon from "../../Icons/PlayIcon";
import PauseIcon from "../../Icons/PuaseIcon";

interface VoicePlayerProps {
  src: string;
  className?: string;
}

let currentlyPlayingAudio: HTMLAudioElement | null = null;

const VoicePlayer = ({ src, className }: VoicePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
        currentlyPlayingAudio.pause();
        currentlyPlayingAudio.currentTime = 0;
      }

      audio.play();
      currentlyPlayingAudio = audio;
    }
  };

  return (
    <div
      className={`flex items-center gap-2 py-2 pl-1 text-white rounded-xl w-full max-w-sm ${className}`}
    >
      <button
        className="w-9 h-9 cursor-pointer flex items-center justify-center pl-[1.5px] bg-gray-700 rounded-full hover:bg-gray-600"
        onClick={togglePlay}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <div className="relative flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <audio ref={audioRef} src={src} />
    </div>
  );
};

export default VoicePlayer;
