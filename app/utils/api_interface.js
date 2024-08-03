import { supabase } from "./supabase";

export const getPuzzleData = async () => {
  const { data, error } = await supabase.from("random_puzzle").select("*").limit(1);

  
  return { data, error };
};
