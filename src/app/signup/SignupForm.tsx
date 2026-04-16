"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signup } from "@/app/actions/auth";

const initialState = { error: null as string | null };

export default function SignupForm() {
  const [state, action, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      try {
        await signup(formData);
        return { error: null };
      } catch (e) {
        return { error: (e as Error).message };
      }
    },
    initialState
  );

  return (
    <form action={action} className="flex flex-col gap-5">
      {state.error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {state.error}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="name"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Nome <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Seu nome"
          required
          autoComplete="name"
          className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          E-mail <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="voce@exemplo.com"
          required
          autoComplete="email"
          className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Senha <span className="text-red-500">*</span>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Mínimo 8 caracteres"
          required
          autoComplete="new-password"
          className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
      >
        {pending ? "Criando conta…" : "Criar conta →"}
      </button>

      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
        Já tem conta?{" "}
        <Link
          href="/login"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Entrar
        </Link>
      </p>
    </form>
  );
}
