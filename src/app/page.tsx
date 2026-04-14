import Link from "next/link";
import FlashCard from "./components/FlashCard";

const demoCard = {
  english: "serendipity",
  portuguese: "serendipidade",
  example: "Finding that café was pure serendipity.",
};

const steps = [
  {
    number: "01",
    title: "Veja a palavra em inglês",
    description:
      "Cada carta mostra uma palavra ou expressão em inglês. Tente lembrar o significado antes de revelar.",
  },
  {
    number: "02",
    title: "Clique para revelar",
    description:
      "Vire a carta e confira o significado em português. Simples assim — sem múltipla escolha, sem pressão.",
  },
  {
    number: "03",
    title: "Repita e evolua",
    description:
      "Quanto mais você pratica, mais palavras ficam na memória. O vocabulário cresce a cada rodada.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-zinc-900">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
        <span className="font-bold text-zinc-900 dark:text-white tracking-tight">
          FlashEnglish
        </span>
        <Link
          href="/cards/new"
          className="rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          Criar carta
        </Link>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center gap-10 px-6 py-24 text-center">
        <div className="flex flex-col items-center gap-4 max-w-xl">
          <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-950 dark:border-indigo-800 dark:text-indigo-400">
            Para falantes de português 🇧🇷
          </span>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Aprenda inglês jogando com{" "}
            <span className="text-indigo-600">flashcards</span>
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            FlashEnglish é um jogo de cartas para quem quer expandir o
            vocabulário em inglês de forma rápida, leve e eficiente — sem
            precisar sair do lugar.
          </p>
        </div>

        {/* Live demo card */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
            Experimente agora
          </p>
          <FlashCard card={demoCard} />
        </div>
      </section>

      {/* How it works */}
      <section className="bg-zinc-50 dark:bg-zinc-800/40 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-2xl font-bold text-zinc-900 dark:text-white">
            Como funciona?
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col gap-3">
                <span className="text-3xl font-black text-indigo-200 dark:text-indigo-900">
                  {step.number}
                </span>
                <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center gap-6 px-6 py-24 text-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white max-w-md">
          Pronto para ampliar seu vocabulário?
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm">
          Crie sua primeira carta agora e comece a praticar. É grátis, rápido e
          funciona no celular.
        </p>
        <Link
          href="/cards/new"
          className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Criar minha primeira carta →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 dark:border-zinc-800 px-6 py-6 text-center text-xs text-zinc-400">
        FlashEnglish — feito para brasileiros que querem falar inglês de verdade.
      </footer>
    </div>
  );
}
