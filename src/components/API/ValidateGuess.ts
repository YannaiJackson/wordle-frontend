/**
 * This file contains an asynchronous function to validate a guess against a Wordle-like API.
 */

// Define the structure of the validation response
type ValidationResponse = {
  isValid: boolean;
  message?: string;
};

// Define the parameters for the fetchValidation function
interface FetchValidationParams {
  guess: string;
}

/**
 * Function to fetch and validate a guess against the API.
 * @param guess - The guess to validate.
 * @returns a Promise that resolves with the validation response if the fetch is successful; otherwise, resolves with null.
 * @throws an error if the fetch fails or if an error occurs during the fetch.
 */
export async function fetchValidation({ guess }: FetchValidationParams): Promise<ValidationResponse | null> {
  try {
    const url = new URL('http://127.0.0.1:8000/en/validate-guess');
    url.searchParams.append('guess', guess);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const data = (await response.json()) as ValidationResponse;
      return data;
    } else {
      console.error('Failed to validate guess:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error validating guess:', error);
    return null;
  }
}