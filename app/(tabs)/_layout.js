import { Text } from "react-native";
import { Redirect, Stack } from "expo-router";

import { useTheme } from "react-native-paper";
import { supabase } from "../utils/supabase";
import { IconButton } from "react-native-paper";
import { router } from "expo-router"

export default function AppLayout() {

  const theme = useTheme();

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: theme.colors.background },
        headerTitleStyle: theme.fonts.titleMedium,
      }}>
      <Stack.Screen
        name="puzzles"
        options={{
          headerShown: true,
          title: "Puzzles",
          animation: "",
          headerLeft: () => (
            <IconButton
              icon="waveform"
              size={30}
              style={{ top: "-10%" }}
              iconColor={theme.colors.primary}
              onPress={() => {
                router.back();
              }}
            />
          ),
        }}
      />
    </Stack>
  );
}
