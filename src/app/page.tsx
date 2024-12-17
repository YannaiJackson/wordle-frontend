'use client';
import React, { useState, useEffect } from 'react';
import WordsGrid from "@/components/WordsGrid";
import { fetchWord } from '@/components/API/GenerateWord';
import WinPopup from "@/components/WinPopup";

export default function Home() {
  const [word, setWord] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showWinPopup, setShowWinPopup] = useState(false);

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
    } catch (error) {
      console.error('Error generating random word:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setShowWinPopup(false);
    getNewWord(); // Restart game by fetching a new word
  };

  useEffect(() => {
    getNewWord();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen text-white text-5xl font-bold">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-screen text-white text-2xl">
        <p>An error occurred while generating a random word.</p>
        <button
          onClick={getNewWord}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 h-screen w-screen">
      {showWinPopup && (
        <WinPopup onClose={() => setShowWinPopup(false)} onRestart={handleRestart} />
      )}
      {word && <WordsGrid word={word} setShowWinPopup={setShowWinPopup} />}
    </div>
  );
}
