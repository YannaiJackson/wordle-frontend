'use client';
import WordsGrid from "@/components/WordsGrid";
import { fetchWord } from '@/components/API/GenerateWord';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [word, setWord] = useState<string | null>(null); // Explicitly define the type as string or null
  const [error, setError] = useState(false);

  useEffect(() => {
    const getWord = async () => {
      console.log('Attempting to fetch random word...');
      try {
        const fetchedWord = await fetchWord();
        
        // Check if the fetched word is null or invalid
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
      }
    };

    getWord();
  }, []);

  if (error || !word) {
    console.log('Error or word not available, displaying error message.');
    return (
      <div className="flex justify-center items-center h-screen w-screen text-white text-5xl font-bold">
        An error occurred while generating a random word. Please try again or contact help.
      </div>
    );
  }

  console.log('Rendering WordsGrid with the word:', word);
  
  return (
    <div className="bg-gray-900 h-screen w-screen">
      {/* If word is valid, pass it to WordsGrid */}
      <WordsGrid word={word} />
    </div>
  );
}
