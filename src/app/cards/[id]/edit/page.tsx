import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import EditCardForm from "./EditCardForm";

export default async function EditCardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: card, error } = await supabase
    .from("cards")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !card) notFound();

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-900">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-800">
        <div className="mb-6">
          <Link
            href="/cards"
            className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            ← voltar para cartas
          </Link>
          <h1 className="mt-3 text-xl font-bold text-zinc-800 dark:text-zinc-100">
            Editar carta
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Altere os campos abaixo e salve.
          </p>
        </div>

        <EditCardForm card={card} />
      </div>
    </main>
  );
}
