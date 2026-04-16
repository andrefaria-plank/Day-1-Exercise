import Link from "next/link";
import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import type { Card } from "@/lib/types";
import SearchInput from "./SearchInput";
import { verifySession } from "@/lib/dal";
import { logout } from "@/app/actions/auth";

const PAGE_SIZE = 8;

async function fetchCards(q: string, page: number) {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("cards")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (q) {
    query = query.or(`english.ilike.%${q}%,portuguese.ilike.%${q}%`);
  }

  const { data, count, error } = await query;
  if (error) throw new Error(error.message);

  return { cards: (data ?? []) as Card[], total: count ?? 0 };
}

export default async function CardsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const [{ email }, { q = "", page: pageParam = "1" }] = await Promise.all([
    verifySession(),
    searchParams,
  ]);
  const page = Math.max(1, parseInt(pageParam, 10) || 1);

  const { cards, total } = await fetchCards(q, page);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  function pageUrl(p: number) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    params.set("page", String(p));
    return `/cards?${params.toString()}`;
  }

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
        <Link
          href="/"
          className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight"
        >
          FlashEnglish
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-zinc-400 dark:text-zinc-500 sm:block">
            {email}
          </span>
          <Link
            href="/cards/new"
            className="rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            + Nova carta
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-zinc-200 px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:border-red-300 hover:text-red-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-red-700 dark:hover:text-red-400"
            >
              Sair
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
              Suas cartas
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {total} {total === 1 ? "carta encontrada" : "cartas encontradas"}
            </p>
          </div>
          {/* SearchInput needs useSearchParams so wrap in Suspense */}
          <Suspense>
            <SearchInput />
          </Suspense>
        </div>

        {cards.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-zinc-200 py-16 text-center dark:border-zinc-700">
            <p className="text-zinc-500 dark:text-zinc-400">
              {q
                ? `Nenhuma carta encontrada para "${q}".`
                : "Você ainda não tem cartas. Crie a primeira!"}
            </p>
            {!q && (
              <Link
                href="/cards/new"
                className="text-sm font-medium text-indigo-600 hover:underline"
              >
                Criar carta →
              </Link>
            )}
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {cards.map((card) => (
              <li
                key={card.id}
                className="flex items-center justify-between rounded-xl border border-zinc-100 bg-white px-5 py-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                    {card.english}
                  </span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {card.portuguese}
                  </span>
                  {card.example && (
                    <span className="mt-1 text-xs italic text-zinc-400 dark:text-zinc-500">
                      &ldquo;{card.example}&rdquo;
                    </span>
                  )}
                </div>
                <Link
                  href={`/cards/${card.id}/edit`}
                  className="ml-4 shrink-0 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
                >
                  Editar
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {page > 1 && (
              <Link
                href={pageUrl(page - 1)}
                className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors dark:border-zinc-700 dark:text-zinc-400"
              >
                ← Anterior
              </Link>
            )}
            <span className="text-sm text-zinc-500">
              Página {page} de {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={pageUrl(page + 1)}
                className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors dark:border-zinc-700 dark:text-zinc-400"
              >
                Próxima →
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
