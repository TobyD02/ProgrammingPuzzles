import React, { useEffect } from "react";
import Puzzle from "./pages/puzzle";
import { PaperProvider, MD3DarkTheme as DefaultTheme } from "react-native-paper";

export default function App() {

  const theme = {...DefaultTheme}


  return (
  <PaperProvider theme={theme}>
    <Puzzle />
  </PaperProvider>
  )
}