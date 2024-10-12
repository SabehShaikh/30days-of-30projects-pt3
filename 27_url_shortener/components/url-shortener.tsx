"use client"; // Enables client-side rendering for this component

import React, { useState } from "react"; // Import React and useState hook
import { Input } from "@/components/ui/input"; // Import custom Input component
import { Button } from "@/components/ui/button"; // Import custom Button component
import { CopyIcon } from "lucide-react"; // Import CopyIcon from lucide-react
import axios from "axios"; // Import axios for HTTP requests\
import { FaGithub, FaLinkedin } from "react-icons/fa";

const BITLY_API_URL = "https://api-ssl.bitly.com/v4/shorten";
const BITLY_ACCESS_TOKEN = process.env.NEXT_PUBLIC_BITLY_ACCESS_TOKEN;

export default function URLShortener() {
  const [longUrl, setLongUrl] = useState<string>(""); // State to manage the long URL input
  const [shortUrl, setShortUrl] = useState<string>(""); // State to manage the shortened URL
  const [error, setError] = useState<string>(""); // State to manage error messages

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error state
    setShortUrl(""); // Reset shortened URL state

    try {
      const response = await axios.post(
        BITLY_API_URL,
        {
          long_url: longUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${BITLY_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      setShortUrl(response.data.link); // Set the shortened URL state with the response data
    } catch (err) {
      setError("Failed to shorten the URL. Please try again."); // Set error state if the request fails
    }
  };

  // Function to handle copying the shortened URL to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Successfully Copied the Short URL!"); // Alert user that the URL has been copied
  };

  // JSX return statement rendering the URL Shortener UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-md w-full space-y-4 p-6 rounded-lg bg-background shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">URL Shortener</h1>
          <p className="text-muted-foreground">
            Paste your long URL and get a short, shareable link.
          </p>
        </div>
        {/* Form to input and submit the long URL */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <Input
              type="url"
              placeholder="Paste your long URL here"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="pr-24"
              required
            />
            <Button
              type="submit"
              className="absolute top-1/2 right-0 -translate-y-1/2"
            >
              Shorten
            </Button>
          </div>
          {/* Display error message if any */}
          {error && <div className="text-red-500 text-center">{error}</div>}
          {/* Display the shortened URL and copy button */}
          {shortUrl && (
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <Input
                  type="text"
                  value={shortUrl}
                  readOnly
                  className="cursor-pointer"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:bg-muted/50"
                onClick={handleCopy}
              >
                <CopyIcon className="w-5 h-5" />
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          )}
        </form>
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
        <div className="text-center text-sm md:text-sm text-gray-500 mt-4">
          Made by Sabeh Shaikh
        </div>
      </div>
    </div>
  );
}
