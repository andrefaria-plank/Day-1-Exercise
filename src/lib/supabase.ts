import { createClient } from "@supabase/supabase-js";
import type { Card } from "./types";

type Database = {
  public: {
    Tables: {
      cards: {
        Row: Card;
        Insert: Omit<Card, "id" | "created_at">;
      };
    };
  };
};

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
