import React, { useEffect } from "react";
// import Puzzle from "./puzzles";
import { PaperProvider, MD3DarkTheme as DefaultTheme, TextInput, Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native";
import {router} from "expo-router";
import { Stack } from "expo-router";

export default function Page() {

  const theme = {...DefaultTheme}


  return (
  <PaperProvider theme={theme}>
    <SafeAreaView>
      <Text>Main App</Text>
      <Button onPress={() => router.push('(tabs)/puzzles')}>Puzzles</Button>
      <Button onPress={() => router.push('(tabs)/create_puzzle')}>Create a puzzle</Button>
    </SafeAreaView>
  </PaperProvider>
  )
}