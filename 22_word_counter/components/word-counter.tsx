"use client";
import React, { useState, ChangeEvent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function WordCounter() {
  const [text, setText] = useState<string>("");

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const clearText = () => {
    setText("");
  };

  const wordCount = text
    // trim removes any leading and trailing whitespace from the input.
    .trim()
    // split turns the string into an array of words.
    .split(/\s+/)
    // filter removes any empty strings.
    .filter((word) => word).length;

  const characterCount = text.length;

  // JSX return statement rendering the Word Counter UI
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Card for text analysis */}
      <Card className="w-full max-w-md">
        <CardHeader className="text-center justify-center flex flex-col">
          <CardTitle>Text Analysis</CardTitle>
          <CardDescription>
            Enter text and see the word and character count.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Textarea for input text */}
          <Textarea
            id="text-input"
            placeholder="Enter your text here..."
            className="h-32 resize-none"
            value={text}
            onChange={handleTextChange}
          />
          {/* Display word and character count */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <span id="word-count">{wordCount}</span> words,{" "}
              <span id="char-count">{characterCount}</span> characters
            </div>
            {/* Button to clear the input text */}
            <Button onClick={clearText}>Clear</Button>
          </div>
        </CardContent>
      </Card>

      {/* Social media icons */}
      <div className="mt-8 flex justify-center space-x-5">
        <a
          href="https://github.com/SabehShaikh"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit my GitHub profile"
          className="text-gray-100 hover:text-gray-500"
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
      <div className="text-center text-sm text-gray-400 mt-4">
        Made by Sabeh Shaikh
      </div>
    </div>
  );
}
