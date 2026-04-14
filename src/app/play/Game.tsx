"use client";

import { useState } from "react";
import type { Card } from "@/lib/types";

type Phase = "idle" | "playing" | "results";

type RoundResult = {
  card: Card;
  correct: boolean;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Game({ cards }: { cards: Card[] }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [deck, setDeck] = useState<Card[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<RoundResult[]>([]);

  function startGame() {
    setDeck(shuffle(cards));
    setIndex(0);
    setFlipped(false);
    setResults([]);
    setPhase("playing");
  }

  function answer(correct: boolean) {
    const updated = [...results, { card: deck[index], correct }];
    setResults(updated);

    if (index + 1 >= deck.length) {
      setPhase("results");
      return;
    }
    setIndex((i) => i + 1);
    setFlipped(false);
  }

  function stopEarly() {
    setPhase("results");
  }

  if (phase === "idle") {
    return <IdleScreen total={cards.length} onStart={startGame} />;
  }

  if (phase === "results") {
    return <ResultsScreen results={results} onRestart={startGame} />;
  }

  const current = deck[index];
  const answered = results.length;
  const correct = results.filter((r) => r.correct).length;

  return (
    <div className="flex flex-1 flex-col items-center justify-between gap-6 px-4 py-10">
      {/* Top bar */}
      <div className="flex w-full max-w-sm items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            ✓ {correct}
          </span>
          <span className="font-semibold text-red-500 dark:text-red-400">
            ✗ {answered - correct}
          </span>
        </div>
        <span className="text-sm text-zinc-400">
          {index + 1} / {deck.length}
        </span>
        <button
          onClick={stopEarly}
          className="text-xs text-zinc-400 hover:text-red-500 transition-colors"
        >
          Parar
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full max-w-sm rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          className="h-1.5 rounded-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${((index) / deck.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div className="flex flex-col items-center gap-6">
        <div
          className="w-80 h-52 cursor-pointer [perspective:1000px]"
          onClick={() => !flipped && setFlipped(true)}
          aria-label={flipped ? "Carta virada" : "Clique para virar"}
        >
          <div
            className={`relative w-full h-full [transform-style:preserve-3d] ${
              flipped ? "transition-transform duration-500 [transform:rotateY(180deg)]" : ""
            }`}
          >
            {/* Front — English */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg [backface-visibility:hidden] p-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-200 mb-3">
                English
              </span>
              <p className="text-3xl font-bold text-white text-center leading-snug">
                {current.english}
              </p>
              {current.example && (
                <p className="mt-4 text-sm text-indigo-200 italic text-center line-clamp-2">
                  &ldquo;{current.example}&rdquo;
                </p>
              )}
              <span className="absolute bottom-4 text-xs text-indigo-300">
                clique para revelar
              </span>
            </div>

            {/* Back — Portuguese */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] p-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-200 mb-3">
                Português
              </span>
              <p className="text-3xl font-bold text-white text-center leading-snug">
                {current.portuguese}
              </p>
            </div>
          </div>
        </div>

        {/* Answer buttons — only shown after flipping */}
        {flipped ? (
          <div className="flex gap-3">
            <button
              onClick={() => answer(false)}
              className="flex items-center gap-2 rounded-xl border-2 border-red-200 bg-red-50 px-6 py-3 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors dark:border-red-800 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900"
            >
              ✗ Errei
            </button>
            <button
              onClick={() => answer(true)}
              className="flex items-center gap-2 rounded-xl border-2 border-emerald-200 bg-emerald-50 px-6 py-3 text-sm font-semibold text-emerald-600 hover:bg-emerald-100 transition-colors dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 dark:hover:bg-emerald-900"
            >
              ✓ Acertei
            </button>
          </div>
        ) : (
          <p className="text-sm text-zinc-400">
            Pense no significado e vire a carta
          </p>
        )}
      </div>

      <div /> {/* spacer */}
    </div>
  );
}

function IdleScreen({
  total,
  onStart,
}: {
  total: number;
  onStart: () => void;
}) {
  if (total === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-zinc-500 dark:text-zinc-400">
          Você ainda não tem cartas cadastradas.
        </p>
        <a
          href="/cards/new"
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          Criar primeira carta →
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center px-4">
      <div className="flex flex-col items-center gap-2">
        <span className="text-5xl">🃏</span>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Pronto para jogar?
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-xs">
          Você tem{" "}
          <span className="font-semibold text-indigo-600">{total} cartas</span>.
          Vire cada carta e diga se acertou ou errou o significado.
        </p>
      </div>
      <button
        onClick={onStart}
        className="rounded-full bg-indigo-600 px-10 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm"
      >
        Iniciar jogo →
      </button>
    </div>
  );
}

function ResultsScreen({
  results,
  onRestart,
}: {
  results: RoundResult[];
  onRestart: () => void;
}) {
  const correct = results.filter((r) => r.correct);
  const wrong = results.filter((r) => !r.correct);
  const total = results.length;
  const pct = total > 0 ? Math.round((correct.length / total) * 100) : 0;

  return (
    <div className="flex flex-1 flex-col items-center gap-8 px-4 py-10 w-full max-w-md mx-auto">
      {/* Score */}
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-5xl font-black text-indigo-600">{pct}%</span>
        <p className="text-zinc-700 dark:text-zinc-300 font-medium">
          {correct.length} de {total} corretas
        </p>
        <p className="text-sm text-zinc-400">
          {pct === 100
            ? "Perfeito! Você acertou tudo 🎉"
            : pct >= 70
            ? "Muito bom! Continue praticando 💪"
            : "Continue praticando, você vai melhorar 📚"}
        </p>
      </div>

      {/* Wrong answers */}
      {wrong.length > 0 && (
        <div className="w-full flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
            Você errou ({wrong.length})
          </h3>
          <ul className="flex flex-col gap-2">
            {wrong.map(({ card }) => (
              <li
                key={card.id}
                className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50 px-4 py-3 dark:border-red-900 dark:bg-red-950/30"
              >
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  {card.english}
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {card.portuguese}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-3">
        <a
          href="/"
          className="rounded-full border border-zinc-200 px-6 py-2.5 text-sm font-medium text-zinc-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors dark:border-zinc-700 dark:text-zinc-400"
        >
          Início
        </a>
        <button
          onClick={onRestart}
          className="rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
        >
          Jogar de novo
        </button>
      </div>
    </div>
  );
}
