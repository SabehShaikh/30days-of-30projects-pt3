"use client"; // Enables client-side rendering for this component

import { useState, useEffect } from "react"; // Import useState and useEffect hooks from React
import { Button } from "@/components/ui/button"; // Import custom Button component
import ClipLoader from "react-spinners/ClipLoader";
import { FaGithub, FaLinkedin } from "react-icons/fa";


// define answer type:
type Answer = {
  text: string;
  isCorrect: boolean;
};

// define question type:
type Question = {
  question: string;
  answers: Answer[];
};

// Define the QuizState type
type QuizState = {
  currentQuestion: number;
  score: number;
  showResults: boolean;
  questions: Question[];
  isLoading: boolean;
};

export default function QuizApp() {
  // State to manage the quiz:
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    showResults: false,
    questions: [],
    isLoading: true,
  });

  // useEffect to fetch quiz questions from API when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=10&type=multiple"
        );
        const data = await response.json();
        const questions = data.results.map((item: any) => {
          const incorrectAnswers = item.incorrect_answers.map(
            (answer: string) => ({
              text: answer,
              isCorrect: false,
            })
          );
          const correctAnswer = {
            text: item.correct_answer,
            isCorrect: true,
          };
          return {
            question: item.question,
            answers: [...incorrectAnswers, correctAnswer].sort(
              () => Math.random() - 0.5
            ),
          };
        });

        setQuizState((prevState) => ({
          ...prevState,
          questions,
          isLoading: false,
        }));
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerClick = (isCorrect: boolean): void => {
    // Step 1: Update score if the answer is correct
    if (isCorrect) {
      setQuizState((prevState) => ({
        ...prevState,
        score: prevState.score + 1, // Increment score if the answer is correct
      }));
    }
    
    // Step 2: Move to the next question
    const nextQuestion = quizState.currentQuestion + 1;
    
    // Step 3: If there are more questions, move to the next one:
    if (nextQuestion < quizState.questions.length) {
        setQuizState((prevState) => ({
      ...prevState,
      currentQuestion: nextQuestion, // Move to the next question
    }));
}

// Step 4: If there are no more questions, show the results:
else {
    setQuizState((prevState) => ({
        ...prevState,
        showResults: true, // End the quiz and show the results
    }));
}
};

  const resetQuiz = (): void => {
    setQuizState({
      currentQuestion: 0, // Reset to the first question
      score: 0, // Reset the score to 0
      showResults: false, // Hide the results page
      questions: quizState.questions, // Keep the questions as they are
      isLoading: false, // Ensure the loading spinner is off
    });
  };
  // Show loading spinner if the questions are still loading
  if (quizState.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
        <ClipLoader />
        <p>Loading quiz questions, please wait...</p>
      </div>
    );
  }

  // Show message if no questions are available
  if (quizState.questions.length === 0) {
    return <div>No questions available.</div>;
  }

  const currentQuestion = quizState.questions[quizState.currentQuestion];

  // JSX return statement rendering the Quiz UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {quizState.showResults ? (
        // Show results if the quiz is finished
        <div className="bg-card p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Results</h2>
          <p className="text-lg mb-4">
            You scored {quizState.score} out of {quizState.questions.length}
          </p>
          <Button onClick={resetQuiz} className="w-full">
            Try Again
          </Button>
        </div>
      ) : (
        // Show current question and answers if the quiz is in progress
        <div className="bg-card p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">
            Question {quizState.currentQuestion + 1}/
            {quizState.questions.length}
          </h2>
          <p
            className="text-lg mb-4"
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          />
          <div className="grid gap-4">
            {currentQuestion.answers.map((answer, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerClick(answer.isCorrect)}
                className="w-full"
              >
                {answer.text}
              </Button>
            ))}
          </div>
          <div className="mt-4 text-right">
            <span className="text-muted-foreground">
              Score: {quizState.score}
            </span>
          </div>
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
        </div>
        
      )}
    
    </div>
  );
}
