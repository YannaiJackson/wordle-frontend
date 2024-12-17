import config from '../../../config';


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
    // Get the URL from config file
    const apiUrl = config.API_BASE_URL + config.URL_WORD_VALIDATOR_ENDPOINT;
    console.log('Word validation endpoint:', apiUrl);

    if (!apiUrl) {
      throw new Error('API URL is not defined in config file.');
    }

    const url = new URL(apiUrl);
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