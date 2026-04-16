import Link from "next/link";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-zinc-900">
      {/* Nav */}
      <header className="flex items-center justify-between border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
        <Link
          href="/"
          className="font-bold tracking-tight text-zinc-900 dark:text-white"
        >
          FlashEnglish
        </Link>
        <Link
          href="/signup"
          className="rounded-full border border-zinc-200 px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:border-indigo-400 hover:text-indigo-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
        >
          Criar conta
        </Link>
      </header>

      {/* Main */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
        <div className="flex w-full max-w-md flex-col gap-8">
          {/* Badge */}
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-400">
              Entre na sua conta
            </span>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Bem-vindo de volta
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Digite seu e-mail e senha para continuar.
              </p>
            </div>
          </div>

          <LoginForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-100 px-6 py-6 text-center text-xs text-zinc-400 dark:border-zinc-800">
        FlashEnglish — feito para brasileiros que querem falar inglês de verdade.
      </footer>
    </div>
  );
}
