/**
 * This file contains the main page component for the Wordle game.
 */

'use client';
import React, { useState, useEffect } from 'react';
import WordsGrid from "@/components/WordsGrid";
import { fetchWord } from '@/components/API/GenerateWord';
import WinPopup from "@/components/WinPopup";
import LosePopup from "@/components/LosePopup";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen";

/**
 * The main page component for the Wordle game.
 * Fetches a random word, handles game restarts, and displays the WordsGrid component.
 */
export default function Home() {
  const [word, setWord] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gameStatus, setGameStatus] = useState<'win' | 'lose' | null>(null); // Tracks game end status

  // Function to fetch a new random word from the API
  const getNewWord = async () => {
    setLoading(true);
    setError(false);
    try {
      console.log('Attempting to fetch a new random word...');
      const fetchedWord = await fetchWord();

      if (!fetchedWord || typeof fetchedWord !== 'string') {
        console.error('Fetched word is invalid:', fetchedWord);
        throw new Error('Invalid word fetched');
      }

      const uppercaseWord = fetchedWord.toUpperCase();
      console.log('Successfully fetched word:', uppercaseWord);
      setWord(uppercaseWord);
    } catch (err) {
      console.error('Error generating random word:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle game restarts
  const handleRestart = () => {
    setGameStatus(null); // Reset game status
    console.log('Game restarting...');
    getNewWord(); // Restart game by fetching a new word
  };

  // Fetch a new word when the component mounts
  useEffect(() => {
    console.log('Component mounted. Starting game...');
    getNewWord();
  }, []);

  // Conditional rendering for loading, error, or main game screen
  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen onRetry={getNewWord} />;

  return (
    <div className="bg-gray-900 h-screen w-screen">
      {gameStatus === 'win' && <WinPopup onRestart={handleRestart} />}
      {gameStatus === 'lose' && <LosePopup onRestart={handleRestart} correctWord={word || 'Error fetching word'} />}
      {word && (
        <WordsGrid
          word={word}
          onWin={() => setGameStatus('win')} // Set game status to 'win'
          onLose={() => setGameStatus('lose')} // Set game status to 'lose'
        />
      )}
    </div>
  );
}
