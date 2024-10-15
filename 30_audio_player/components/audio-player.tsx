"use client"; // Enables client-side rendering for this component

import React, { useState, useRef, useEffect } from "react"; // Import React hooks
import { Button } from "@/components/ui/button"; // Import custom Button component
import { Card, CardContent } from "@/components/ui/card"; // Import custom Card components
import { Progress } from "@/components/ui/progress"; // Import custom Progress component
import {
  ForwardIcon,
  PlayIcon,
  RewindIcon,
  UploadIcon,
  PauseIcon,
} from "lucide-react"; // Import icons from lucide-react
import Image from "next/image"; // Import Next.js Image component
import { FaGithub, FaLinkedin } from "react-icons/fa";  

// Define types for the component props and state:
interface AudioPlayerProps {}

// Define the Track interface:
interface Track {
  title: string;
  artist: string;
  src: string;
}

// Define the AudioPlayer component:
const AudioPlayer: React.FC<AudioPlayerProps> = () => {
  // State to manage the list of tracks
  const [tracks, setTracks] = useState<Track[]>([]);
  // State to manage the current track index
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  // State to manage the play/pause status
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // State to manage the progress of the current track
  const [progress, setProgress] = useState<number>(0);
  // State to manage the current time of the track
  const [currentTime, setCurrentTime] = useState<number>(0);
  // State to manage the duration of the track
  const [duration, setDuration] = useState<number>(0);
  // Ref to manage the audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newTracks = Array.from(files).map((file) => ({
        title: file.name,
        artist: "Unknown Artist",
        src: URL.createObjectURL(file),
      }));

      setTracks((prevTracks) => [...prevTracks, ...newTracks]);
    }
  };

  // Function to handle play/pause
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };
  // Function to handle next track

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  // Function to handle previous track
  const handlePrevTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      // Update the current time of the track
      setCurrentTime(audioRef.current.currentTime);
      // Update the progress percentage
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      // Set the total duration of the track
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60); // Calculate minutes
    const seconds = Math.floor(time % 60); // Calculate remaining seconds
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; // Format with leading zero for seconds
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the previous track
      audioRef.current.src = tracks[currentTrackIndex]?.src || ""; // Load the new track
      audioRef.current.load(); // Ensure the audio element reloads the track

      audioRef.current.currentTime = 0; // Reset the current time to 0 for the new track
      setCurrentTime(0); // Update the current time state
      setProgress(0); // Reset the progress bar

      if (isPlaying) {
        audioRef.current.play(); // Automatically play the new track if the player was playing
      }
    }
  }, [currentTrackIndex, tracks, isPlaying]);

  // JSX return statement rendering the Audio Player UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-md w-full space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Audio Player</h1>
          <label className="flex items-center cursor-pointer">
            <UploadIcon className="w-5 h-5 mr-2" />
            <span>Upload</span>
            <input
              type="file"
              accept="audio/*"
              multiple
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 p-8">
            <Image
              src="/music.svg"
              alt="Album Cover"
              width={100}
              height={100}
              className="rounded-full w-32 h-32 object-cover"
            />
            <div className="text-center">
              <h2 className="text-xl font-bold">
                {tracks[currentTrackIndex]?.title || "Audio Title"}
              </h2>
              <p className="text-muted-foreground">
                {tracks[currentTrackIndex]?.artist || "Person Name"}
              </p>
            </div>
            <div className="w-full">
              <Progress value={progress} />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handlePrevTrack}>
                <RewindIcon className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handlePlayPause}>
                {isPlaying ? (
                  <PauseIcon className="w-6 h-6" />
                ) : (
                  <PlayIcon className="w-6 h-6" />
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleNextTrack}>
                <ForwardIcon className="w-6 h-6" />
              </Button>
            </div>
            <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />
          </CardContent>
        </Card>
      </div>
       {/* Social media icons */}
    <div className="mt-6 md:mt-8 flex justify-center space-x-4 md:space-x-5">
      <a
        href="https://github.com/SabehShaikh"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit my GitHub profile"
        className="text-gray-300 hover:text-gray-100"
      >
        <FaGithub className="w-6 h-6 md:w-8 md:h-8" />
      </a>
      <a
        href="https://www.linkedin.com/in/sabeh-shaikh/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit my LinkedIn profile"
        className="text-blue-600 dark:text-blue-400 hover:text-blue-500"
      >
        <FaLinkedin className="w-6 h-6 md:w-8 md:h-8" />
      </a>
    </div>
  
    {/* Footer text */}
    <div className="text-center text-sm md:text-sm text-gray-400 mt-4">
      Made by Sabeh Shaikh
    </div>
    </div>
  );
};

export default AudioPlayer;
