interface FetchColorsParams {
  word: string; // Correct word to match against
  guess: string; // Player's guessed word
}

interface FetchColorsResponse {
  [key: string]: string[];  // Allow indexing with a string key (such as 'truth' or the guess word)
}


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
