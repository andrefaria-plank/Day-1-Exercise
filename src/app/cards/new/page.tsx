import Link from "next/link";
import CreateCardForm from "./CreateCardForm";

export default function NewCardPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-900">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-800">
        <div className="mb-6">
          <Link
            href="/"
            className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            ← back
          </Link>
          <h1 className="mt-3 text-xl font-bold text-zinc-800 dark:text-zinc-100">
            New flashcard
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Add an English word or phrase and its Portuguese meaning.
          </p>
        </div>

        <CreateCardForm />
      </div>
    </main>
  );
}
