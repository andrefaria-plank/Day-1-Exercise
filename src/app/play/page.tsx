import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Game from "./Game";
import { verifySession } from "@/lib/dal";
import { logout } from "@/app/actions/auth";

export default async function PlayPage() {
  const [{ email }, { data: cards, error }] = await Promise.all([
    verifySession(),
    supabase.from("cards").select("*").order("created_at", { ascending: false }),
  ]);

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
        <div className="flex items-center gap-3">
          <Link
            href="/cards"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            Minhas cartas
          </Link>
          <span className="hidden text-xs text-zinc-300 dark:text-zinc-600 sm:block">
            |
          </span>
          <span className="hidden text-xs text-zinc-400 dark:text-zinc-500 sm:block">
            {email}
          </span>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-zinc-400 transition-colors hover:text-red-500 dark:hover:text-red-400"
            >
              Sair
            </button>
          </form>
        </div>
      </header>

      <Game cards={cards ?? []} />
    </div>
  );
}
