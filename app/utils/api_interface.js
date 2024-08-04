import { supabase } from "./supabase";

export const getPuzzleData = async () => {

  // Get 4 random puzzles, 1st is question, rest are incorrect answers

  const output_types = ['integer', 'string']

  const output_choice = output_types[Math.floor(Math.random() * 2)]

  const { data, error } = await supabase.from("random_puzzle").select("*").eq('output_type', output_choice).limit(4);

  return { data, error };
};