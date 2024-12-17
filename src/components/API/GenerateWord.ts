import config from '../../../config';


/**
 * This file contains an asynchronous function to fetch a random word from a Wordle-like API.
 */

/**
 * Function to fetch a random word from the API.
 * @returns a Promise that resolves with the fetched word as a string.
 * @throws an error if the network response is not ok or if an error occurs during the fetch.
 */
export async function fetchWord(): Promise<string> {
  try {
    // Get the URL from config file
    const apiUrl = config.API_BASE_URL + config.URL_WORD_GENERATOR_ENDPOINT;
    console.log('Word generation endpoint:', apiUrl);

    if (!apiUrl) {
      throw new Error('API URL is not defined in config file.');
    }

    const url = new URL(apiUrl);
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.text();
    // Remove the quotation marks
    const cleanedResult = result.replace(/^"(.+)"$/, '$1');
    return cleanedResult;
  } catch (error) {
    console.error('Error generating random word:', error);
    throw error;
  }
}