"use server";

import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { createSession, deleteSession } from "@/lib/session";

export async function login(formData: FormData) {
  const email = (formData.get("email") as string).trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Preencha todos os campos.");
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    throw new Error("E-mail ou senha incorretos.");
  }

  await createSession(data.user.id, data.user.email!);
  redirect("/cards");
}

export async function signup(formData: FormData) {
  const name = (formData.get("name") as string).trim();
  const email = (formData.get("email") as string).trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    throw new Error("Preencha todos os campos.");
  }

  if (password.length < 8) {
    throw new Error("A senha deve ter pelo menos 8 caracteres.");
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) {
    if (
      error.message.toLowerCase().includes("already") ||
      error.message.toLowerCase().includes("registered")
    ) {
      throw new Error("Este e-mail já está cadastrado.");
    }
    if (error.status === 429) {
      throw new Error(
        "Limite de e-mails atingido. Desative a confirmação de e-mail no Supabase ou tente mais tarde."
      );
    }
    throw new Error("Não foi possível criar a conta. Tente novamente.");
  }

  if (!data.user) {
    throw new Error("Não foi possível criar a conta. Tente novamente.");
  }

  await createSession(data.user.id, data.user.email!);
  redirect("/cards");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
