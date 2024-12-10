import Image from "next/image";
import WordsGrid from "@/components/WordsGrid";
import VirtualKeyboard from "@/components/VirtualKeyboard";


export default function Home() {
  return (
    <div className="bg-gray-900 h-screen w-screen">
        <WordsGrid />
    </div>
  );
}
