export async function fetchWord(): Promise<string> {
    try {
      const response = await fetch('http://127.0.0.1:8000/en/random-word', {
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
  