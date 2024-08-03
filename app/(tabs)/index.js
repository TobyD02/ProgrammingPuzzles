import React, { useEffect } from "react";
// import Puzzle from "./puzzles";
import { PaperProvider, MD3DarkTheme as DefaultTheme, TextInput, Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native";
import {router} from "expo-router";

export default function Page() {

  const theme = {...DefaultTheme}


  return (
  <PaperProvider theme={theme}>
    <SafeAreaView>
      <Text>Main App</Text>
      <Button onPress={() => router.replace('(tabs)/puzzles')}>Puzzles</Button>
    </SafeAreaView>
  </PaperProvider>
  )
}