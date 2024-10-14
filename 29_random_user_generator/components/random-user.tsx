"use client"; // Enables client-side rendering for this component

import { useState, useEffect } from "react"; // Import useState and useEffect hooks from React
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; // Import custom Card components
import { Button } from "@/components/ui/button"; // Import custom Button component
import ClipLoader from "react-spinners/ClipLoader";
import Image from "next/image"; // Import Next.js Image component
import { CSSTransition } from "react-transition-group"; // Import CSSTransition for animations
import { MailIcon, MapPinIcon, UserIcon, InfoIcon } from "lucide-react"; // Import icons from lucide-react
import { FaGithub, FaLinkedin } from "react-icons/fa";  

interface User {
  name: string;
  email: string;
  address: string;
  image: string;
  description: string;
}

const RandomUser: React.FC = () => {
  // State to manage the fetched user:
  const [user, setUser] = useState<User | null>(null);

  // State to manage the loading state:
  const [loading, setLoading] = useState<boolean>(false);

  // State to manage error messages
  const [error, setError] = useState<string | null>(null);

  // State to manage appreciation message visibility
  const [appreciationVisible, setAppreciationVisible] =
    useState<boolean>(false);

  // Function to fetch a random user:
  const fetchRandomUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      const fetchedUser = data.results[0];
      const newUser: User = {
        name: `${fetchedUser.name.first} ${fetchedUser.name.last}`,
        email: fetchedUser.email,
        address: `${fetchedUser.location.street.number} ${fetchedUser.location.street.name}, ${fetchedUser.location.city}, ${fetchedUser.location.country}`,
        image: fetchedUser.picture.large,
        description: fetchedUser.login.uuid, // Using UUID as a placeholder for description
      };
      setUser(newUser);
    } catch (err) {
      setError("Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomUser();
  }, []);

  const handleAppreciate = () => {
    setAppreciationVisible(true); // Show the appreciation message
    setTimeout(() => setAppreciationVisible(false), 2000); // Hide it after 2 seconds
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-4">
    <h1 className="text-3xl font-bold mb-4">Random User Generator</h1>
    <p className="text-gray-400 mb-6 text-center">
      Click the button below to fetch a random user profile.
    </p>
    
    <Button onClick={fetchRandomUser} className="mb-6">
      Fetch New User
    </Button>
  
    {loading && (
      <div className="flex items-center justify-center">
        <ClipLoader className="w-6 h-6 mr-2" />
        <span>Loading...</span>
      </div>
    )}
  
    {error && <div className="text-red-500">{error}</div>}
  
    {user && (
      <Card className="border-0 shadow-lg rounded-lg overflow-hidden max-w-sm w-full sm:w-80 relative">
        <CardHeader className="h-32 bg-[#55ef83] relative">
          <Image
            src={user.image}
            alt={user.name}
            width={80}
            height={80}
            className="rounded-full border-4 border-white absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
          />
        </CardHeader>
  
        <CardContent className="p-6 pt-12 text-center">
          <CardTitle className="text-xl font-bold flex items-center justify-center">
            <UserIcon className="mr-2" /> {user.name}
          </CardTitle>
          <CardDescription className="text-gray-400 flex items-center justify-center">
            <MailIcon className="mr-2" /> {user.email}
          </CardDescription>
          <div className="text-sm text-gray-400 mt-2 flex items-center justify-center">
            <MapPinIcon className="mr-2" /> {user.address}
          </div>
          <div className="text-sm text-gray-400 mt-2 flex items-center justify-center">
            <InfoIcon className="mr-2" /> {user.description}
          </div>
  
          <Button variant="outline" className="mt-4" onClick={handleAppreciate}>
            Appreciate
          </Button>
        </CardContent>
  
        <CSSTransition
          in={appreciationVisible}
          timeout={300}
          classNames="appreciation"
          unmountOnExit
        >
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75">
            <h2 className="text-2xl font-bold text-black">❤️ Thank you ✨</h2>
          </div>
        </CSSTransition>
      </Card>
    )}
  
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

export default RandomUser;
