/**
 * This file contains an asynchronous function to fetch the color of each letter in a guess against a Wordle-like API.
 */

// Define the parameters for the fetchColors function
interface FetchColorsParams {
  word: string; // Correct word to match against
  guess: string; // Player's guessed word
}

// Define the structure of the fetchColors response
interface FetchColorsResponse {
  [key: string]: string[];  // Allow indexing with a string key (such as 'truth' or the guess word)
}

/**
 * Function to fetch the color of each letter in a guess against the API.
 * @param word - The correct word to match against.
 * @param guess - The player's guessed word.
 * @returns a Promise that resolves with the fetchColors response if the fetch is successful; otherwise, resolves with null.
 * @throws an error if the fetch fails or if an error occurs during the fetch.
 */
export async function fetchColors({ word, guess }: FetchColorsParams): Promise<FetchColorsResponse | null> {
  try {
    const response = await fetch('http://127.0.0.1:8000/en/check-guess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        word,
        guess,
      }),
    });

    if (response.ok) {
      const data: FetchColorsResponse = await response.json();
      return data;
    } else {
      console.error('Failed to fetch colors:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching colors:', error);
    return null;
  }
}