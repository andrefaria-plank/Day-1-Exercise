"use client";

import { useState } from "react";

export type FlashCardData = {
  english: string;
  portuguese: string;
  example?: string;
};

export default function FlashCard({ card }: { card: FlashCardData }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-80 h-52 cursor-pointer [perspective:1000px]"
      onClick={() => setFlipped((f) => !f)}
      aria-label={flipped ? "Click to see English" : "Click to reveal meaning"}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front — English */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg [backface-visibility:hidden] p-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-200 mb-3">
            English
          </span>
          <p className="text-3xl font-bold text-white text-center leading-snug">
            {card.english}
          </p>
          {card.example && (
            <p className="mt-4 text-sm text-indigo-200 italic text-center line-clamp-2">
              &ldquo;{card.example}&rdquo;
            </p>
          )}
          <span className="absolute bottom-4 text-xs text-indigo-300">
            tap to reveal
          </span>
        </div>

        {/* Back — Portuguese */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] p-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-200 mb-3">
            Português
          </span>
          <p className="text-3xl font-bold text-white text-center leading-snug">
            {card.portuguese}
          </p>
          <span className="absolute bottom-4 text-xs text-emerald-300">
            tap to flip back
          </span>
        </div>
      </div>
    </div>
  );
}
