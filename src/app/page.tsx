import FlashCard from "./components/FlashCard";

const firstCard = {
  english: "serendipity",
  portuguese: "serendipidade",
  example: "Finding that café was pure serendipity.",
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-zinc-50 dark:bg-zinc-900 px-4">
      <div className="text-center mb-2">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          English Flashcards
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Tap the card to reveal the Portuguese meaning
        </p>
      </div>

      <FlashCard card={firstCard} />
    </main>
  );
}
