"use client";

import { useActionState } from "react";
import { updateCard } from "@/app/actions/cards";
import type { Card } from "@/lib/types";

const initialState = { error: null as string | null };

export default function EditCardForm({ card }: { card: Card }) {
  const [state, action, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      try {
        await updateCard(card.id, formData);
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

      <Field
        id="english"
        label="Palavra ou expressão em inglês"
        defaultValue={card.english}
        required
      />
      <Field
        id="portuguese"
        label="Significado em português"
        defaultValue={card.portuguese}
        required
      />
      <Field
        id="example"
        label="Exemplo de uso (opcional)"
        defaultValue={card.example ?? ""}
      />

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
      >
        {pending ? "Salvando…" : "Salvar alterações"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  defaultValue,
  required,
}: {
  id: string;
  label: string;
  defaultValue: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        defaultValue={defaultValue}
        required={required}
        className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
      />
    </div>
  );
}
