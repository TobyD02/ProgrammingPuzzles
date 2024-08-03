
import { router } from "expo-router";
import { useEffect } from "react";
import { supabase } from "./utils/supabase";

export default function IndexPage() {

  
  useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {

      // console.log(session)
      if (session) {
        router.replace("/(tabs)");
      } else {
        console.log("no user");
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {

      // console.log(_event, session)
      if (session) {
        router.replace("/(tabs)");
        console.log('user', session)
      } else {
        console.log("no user");
        router.replace("/(auth)/login");
      }
    });
  }, []);

}