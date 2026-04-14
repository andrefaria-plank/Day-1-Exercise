import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Game from "./Game";

export default async function PlayPage() {
  const { data: cards, error } = await supabase
    .from("cards")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-zinc-900">
      <header className="flex items-center justify-between border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
        <Link
          href="/"
          className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight"
        >
          FlashEnglish
        </Link>
        <Link
          href="/cards"
          className="text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
        >
          Minhas cartas
        </Link>
      </header>

      <Game cards={cards ?? []} />
    </div>
  );
}
