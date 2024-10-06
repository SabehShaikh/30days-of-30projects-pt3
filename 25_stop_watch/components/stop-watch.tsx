"use client"; // Enables client-side rendering for this component

import { useState, useEffect } from "react"; // Import useState and useEffect hooks from React
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"; // Import custom Card components
import { Button } from "@/components/ui/button"; // Import custom Button component
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"; // Import custom Table components
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Type Definitions:
type LapTime = number;

// Component Definition and Initial State:
export default function StopWatch() {
  // State to manage whether the stopwatch is running
  const [isRunning, setIsRunning] = useState<boolean>(false);
  // State to manage the current time
  const [time, setTime] = useState<number>(0);
  // State to stores an array of recorded lap times
  const [lapTimes, setLapTimes] = useState<LapTime[]>([]);

  // useEffect to handle the stopwatch timer:
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment time by 10ms
      }, 10);
    }

    // Cleanup function to clear the interval when `isRunning` becomes false or component unmounts
    return () => clearInterval(interval);
  }, [isRunning]); // This runs whenever `isRunning` changes

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLapTimes([]);
  };
  const handleLap = () => {
    setLapTimes((prevLapTimes) => [...prevLapTimes, time]);
  };

  // Calculate minutes, seconds, and milliseconds from the elapsed time
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4">
      <Card className="w-full max-w-lg p-4 md:p-6 lg:p-8">
        <CardHeader className="flex flex-col items-center justify-center text-center">
          <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Stopwatch
          </CardTitle>
          <CardDescription className="text-sm md:text-base lg:text-lg text-gray-600">
            Track your time with this stopwatch.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-6 md:gap-8 p-2 md:p-4">
          {/* Display the elapsed time */}
          <div className="text-5xl md:text-6xl lg:text-8xl font-bold">
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}.
            {milliseconds.toString().padStart(2, "0")}
          </div>
          {/* Buttons to control the stopwatch */}
          <div className="flex gap-2 md:gap-4">
            <Button
              onClick={isRunning ? handleStop : handleStart}
              className="px-4 py-1.5 md:px-6 md:py-2 text-sm md:text-lg font-medium rounded-lg"
            >
              {isRunning ? "Stop" : "Start"}
            </Button>
            <Button
              onClick={handleReset}
              className="px-4 py-1.5 md:px-6 md:py-2 text-sm md:text-lg font-medium rounded-lg"
            >
              Reset
            </Button>
            <Button
              onClick={handleLap}
              className="px-4 py-1.5 md:px-6 md:py-2 text-sm md:text-lg font-medium rounded-lg"
            >
              Lap
            </Button>
          </div>
          {/* Display the list of lap times */}
          <div className="w-full max-w-md">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gray-200 p-2 md:p-4">
                <CardTitle className="text-lg md:text-xl font-semibold">
                  Lap Times
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-[200px] md:max-h-[300px] overflow-auto p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">Lap</TableHead>
                      <TableHead className="text-right">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lapTimes.map((lapTime, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell className="text-right">
                          {Math.floor(lapTime / 60000)
                            .toString()
                            .padStart(2, "0")}
                          :
                          {Math.floor((lapTime % 60000) / 1000)
                            .toString()
                            .padStart(2, "0")}
                          :
                          {Math.floor((lapTime % 1000) / 10)
                            .toString()
                            .padStart(2, "0")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </CardContent>

        {/* Social media icons */}
        <div className="mt-6 md:mt-8 flex justify-center space-x-4 md:space-x-5">
          <a
            href="https://github.com/SabehShaikh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my GitHub profile"
            className="text-gray-800 hover:text-gray-500"
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
            {/*set the width and height to 6 units (approximately 24px). 
           increase the width and height to 8 units (approximately 32px)
           on medium screens and above.*/}
            <FaLinkedin className="w-6 h-6 md:w-8 md:h-8" />
          </a>
        </div>

        {/* Footer text */}
        <div className="text-center text-xs md:text-sm text-gray-500 mt-4">
          Made by Sabeh Shaikh
        </div>
      </Card>
    </div>
  );
}
