"use client";

import { useActionState } from "react";
import { createCard } from "@/app/actions/cards";

const initialState = { error: null as string | null };

export default function CreateCardForm() {
  const [state, action, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      try {
        await createCard(formData);
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
        label="English word or phrase"
        placeholder="e.g. serendipity"
        required
      />
      <Field
        id="portuguese"
        label="Portuguese meaning"
        placeholder="e.g. serendipidade"
        required
      />
      <Field
        id="example"
        label="Example sentence (optional)"
        placeholder="e.g. Finding that café was pure serendipity."
      />

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Create card"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  placeholder,
  required,
}: {
  id: string;
  label: string;
  placeholder: string;
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
        placeholder={placeholder}
        required={required}
        className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
      />
    </div>
  );
}
