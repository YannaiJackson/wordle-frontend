# Wordle Frontend

A web-based Wordle game built using **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**, providing an interactive and fun word-guessing experience.

## Features

- Interactive Wordle gameplay with dynamic UI.
- Designed for desktop users.
- Keyboard support for easy letter input.
- Virtual keyboard option for enhanced accessibility.
- Feedback for correct, misplaced, and incorrect letters.
- Stateless game logic, with no server-side storage.

## Technologies Used

- **Next.js** - For building the server-side rendered application.
- **React** - For building the user interface.
- **TypeScript** - For type-safe development.
- **Tailwind CSS** - For styling the application.
- **React Hooks** - For managing state.

## API Endpoints

The application interacts with the following API endpoints:

```typescript
const config = {
    API_BASE_URL: "http://0.0.0.0:8080/en",
    URL_WORD_GENERATOR_ENDPOINT: "/random-word",
    URL_WORD_VALIDATOR_ENDPOINT: "/validate-guess",
    URL_WORD_CHECKER_ENDPOINT: "/check-guess-against-word",
};
```

## Installation

Follow these steps to run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/wordle-frontend.git
   ```

2. Navigate to directory:
   ```bash
   cd wordle-frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the application in your browser at:
   ```
   http://localhost:3000
   ```

**Note: make sure you have an accesible instance of the API with its configured endpoints.**

## How to Play

1. Guess the 5-letter word within 6 attempts.
2. Each guess must be a valid word.
3. Feedback colors:
   - **Green**: Correct letter in the correct position.
   - **Yellow**: Correct letter in the wrong position.
   - **Gray**: Incorrect letter.

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.
