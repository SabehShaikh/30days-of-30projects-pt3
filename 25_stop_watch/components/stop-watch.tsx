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
    let interval: NodeJS.Timer;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment time by 10ms
      }, 10);
    }
  }, [isRunning]);

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
      <Card className="w-full max-w-lg">
        <CardHeader className="flex flex-col items-center justify-center">
          <CardTitle className="text-5xl font-bold">Stopwatch</CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Track your time with this stopwatch.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-8 p-4">
          {/* Display the elapsed time */}
          <div className="text-8xl font-bold">
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}.
            {milliseconds.toString().padStart(2, "0")}
          </div>
          {/* Buttons to control the stopwatch */}
          <div className="flex gap-4">
            <Button
              onClick={isRunning ? handleStop : handleStart}
              className="px-6 py-2 text-lg font-medium rounded-lg"
            >
              {isRunning ? "Stop" : "Start"}
            </Button>
            <Button
              onClick={handleReset}
              className="px-6 py-2 text-lg font-medium rounded-lg"
            >
              Reset
            </Button>
            <Button
              onClick={handleLap}
              className="px-6 py-2 text-lg font-medium rounded-lg"
            >
              Lap
            </Button>
          </div>
          {/* Display the list of lap times */}
          <div className="w-full max-w-md">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gray-200">
                <CardTitle className="text-xl font-semibold">
                  Lap Times
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-[300px] overflow-auto p-0">
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
      <div className="mt-8 flex justify-center space-x-5">
        <a
          href="https://github.com/SabehShaikh"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit my GitHub profile"
          className="text-gray-800 hover:text-gray-500"
        >
          <FaGithub size={30} />
        </a>
        <a
          href="https://www.linkedin.com/in/sabeh-shaikh/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit my LinkedIn profile"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-500"
        >
          <FaLinkedin size={30} />
        </a>
      </div>

      {/* Footer text */}
      <div className="text-center text-sm text-gray-500 mt-4">
        Made by Sabeh Shaikh
      </div>
      </Card>
  
    </div>
  );
}
