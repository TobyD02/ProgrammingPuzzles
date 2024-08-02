import { Slot } from "expo-router";
import { MD3DarkTheme, PaperProvider } from "react-native-paper";

export default function AuthLayout() {

  const theme = {
    ...MD3DarkTheme,
  };

  return (
    <PaperProvider theme={theme}>
      <Slot />
    </PaperProvider>
  );
}
