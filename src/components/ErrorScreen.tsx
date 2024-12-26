/**
 * Displays an error screen with a retry button.
 */
export default function ErrorScreen({ onRetry }: { onRetry: () => void }) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-screen text-white text-2xl">
        <p>An error occurred while generating a random word.</p>
        <button
          onClick={onRetry}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    );
  }
  