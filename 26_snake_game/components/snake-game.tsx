"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PauseIcon, PlayIcon, RefreshCcwIcon } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
// define the possible game states:
enum GameState {
  START,
  PAUSE,
  RUNNING,
  GAME_OVER,
}

// Define the directions for the snake movement:
enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

// Define the Position interface
interface Position {
  x: number;
  y: number;
}

// Initial state for the snake and food:
const initialSnake: Position[] = [{ x: 0, y: 0 }];
const initialFood: Position = { x: 5, y: 5 };

export default function SnakeGame() {
  // Tracks the current game state (start, running, paused, or game over).
  const [gameState, setGameState] = useState(GameState.START);
  // Holds the snake's current position as an array of Position objects:
  const [snake, setSnake] = useState<Position[]>(initialSnake);
  // Holds the food's current position as a Position object:
  const [food, setFood] = useState<Position>(initialFood);
  // Tracks the current direction of the snake:
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
  //   Tracks the current score:
  const [score, setScore] = useState<number>(0);
  //   Tracks the highest score achieved in the game:
  const [highScore, setHighScore] = useState<number>(0);
  // Tracks the interval ID for the game loop:
  const gameInterval = useRef<NodeJS.Timeout | null>(null);

  // function to move the snake:
  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      if (prevSnake.length === 0) return prevSnake; // Ensure there's a snake
  
      const newSnake = [...prevSnake];
      const head = newSnake[0];
      if (!head) return newSnake; // Ensure the head exists
  
      let newHead: Position;
  
      switch (direction) {
        case Direction.UP:
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case Direction.DOWN:
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case Direction.LEFT:
          newHead = { x: head.x - 1, y: head.y };
          break;
        case Direction.RIGHT:
          newHead = { x: head.x + 1, y: head.y };
          break;
        default:
          return newSnake;
      }
  
      // Check if the snake eats the food
      if (newHead.x === food.x && newHead.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * 10),
          y: Math.floor(Math.random() * 10),
        });
        setScore((prevScore) => prevScore + 1);
      } else {
        newSnake.pop(); // Remove the last part of the snake
      }
  
      newSnake.unshift(newHead); // Add the new head to the snake
      return newSnake;
    });
  }, [direction, food]);

  //   Handle Key Press Events:
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction !== Direction.DOWN) setDirection(Direction.UP);
          break;
        case "ArrowDown":
          if (direction !== Direction.UP) setDirection(Direction.DOWN);
          break;
        case "ArrowLeft":
          if (direction !== Direction.RIGHT) setDirection(Direction.LEFT);
          break;
        case "ArrowRight":
          if (direction !== Direction.LEFT) setDirection(Direction.RIGHT);
          break;
      }
    },
    [direction]
  );

  // useEffect to handle the game interval and key press events
  useEffect(() => {
    if (gameState === GameState.RUNNING) {
      gameInterval.current = setInterval(moveSnake, 150);
      document.addEventListener("keydown", handleKeyPress);
    } else {
      if (gameInterval.current) clearInterval(gameInterval.current);
      document.removeEventListener("keydown", handleKeyPress);
    }

    return () => {
      if (gameInterval.current) clearInterval(gameInterval.current);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameState, moveSnake, handleKeyPress]);

  // Function to start the game
  const startGame = () => {
    setSnake(initialSnake);
    setFood(initialFood);
    setScore(0);
    setDirection(Direction.RIGHT);
    setGameState(GameState.RUNNING);
  };

  // Function to pause or resume the game
  const pauseGame = () => {
    setGameState(
      gameState === GameState.RUNNING ? GameState.PAUSE : GameState.RUNNING
    );
  };

  // Function to reset the game
  const resetGame = () => {
    setGameState(GameState.START);
    setSnake(initialSnake);
    setFood(initialFood);
    setScore(0);
  };

  // useEffect to update the high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  // JSX return statement rendering the Snake Game UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#0F0F0F] to-[#1E1E1E]">
      <div className="bg-[#1E1E1E] rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <div className="text-3xl font-bold text-[#FF00FF]">Snake Game</div>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#00FFFF]"
              onClick={startGame}
            >
              <PlayIcon className="w-6 h-6" />
              <span className="sr-only">Start</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#00FFFF]"
              onClick={pauseGame}
            >
              <PauseIcon className="w-6 h-6" />
              <span className="sr-only">Pause/Resume</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#00FFFF]"
              onClick={resetGame}
            >
              <RefreshCcwIcon className="w-6 h-6" />
              <span className="sr-only">Reset</span>
            </Button>
          </div>
        </div>

        {/* Game Grid */}
        <div className="bg-[#0F0F0F] rounded-lg p-4 grid grid-cols-10 gap-1">
          {Array.from({ length: 100 }).map((_, i) => {
            const x = i % 10;
            const y = Math.floor(i / 10);
            const isSnakePart = snake.some(
              (part) => part.x === x && part.y === y
            );
            const isFood = food.x === x && food.y === y;
            return (
              <div
                key={i}
                className={`w-5 h-5 rounded-sm ${
                  isSnakePart
                    ? "bg-[#FF00FF]"
                    : isFood
                    ? "bg-[#00FFFF]"
                    : "bg-[#1E1E1E]"
                }`}
              />
            );
          })}
        </div>

        {/* Score Display */}
        <div className="flex items-center justify-between mt-6 text-[#00FFFF]">
          <div>Score: {score}</div>
          <div>High Score: {highScore}</div>
        </div>

        {/* Social Media Links */}
        <div className="mt-6 md:mt-8 flex justify-center space-x-4 md:space-x-5">
          <a
            href="https://github.com/SabehShaikh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my GitHub profile"
            className="text-[#FF00FF] hover:text-[#FF99FF]"
          >
            <FaGithub className="w-6 h-6 md:w-8 md:h-8" />
          </a>
          <a
            href="https://www.linkedin.com/in/sabeh-shaikh/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my LinkedIn profile"
            className="text-[#00FFFF] hover:text-[#66FFFF]"
          >
            <FaLinkedin className="w-6 h-6 md:w-8 md:h-8" />
          </a>
        </div>

        {/* Footer Text */}
        <div className="text-center text-xs md:text-sm text-gray-500 mt-4">
          Made by Sabeh Shaikh
        </div>
      </div>
    </div>
  );
}
