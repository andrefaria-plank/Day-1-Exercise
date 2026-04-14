"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export async function createCard(formData: FormData) {
  const english = (formData.get("english") as string).trim();
  const portuguese = (formData.get("portuguese") as string).trim();
  const example = (formData.get("example") as string).trim() || null;

  if (!english || !portuguese) {
    throw new Error("English and Portuguese fields are required.");
  }

  const { error } = await supabase
    .from("cards")
    .insert({ english, portuguese, example });

  if (error) throw new Error(error.message);

  revalidatePath("/");
  redirect("/");
}
