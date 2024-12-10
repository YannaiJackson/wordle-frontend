type ValidationResponse = {
  isValid: boolean;
  message?: string;
};

interface FetchValidationParams {
  guess: string;
}

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
