import React, { useEffect } from "react";

import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import SyntaxHighlighter from "react-native-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/styles/hljs";

import { useTheme, Text } from "react-native-paper";


export default function Page() {

  const theme = useTheme()

  const codeString = `
def hello_world():
    print("Hello, World!")

hello_world()
`;

  const answers = [
    ['A', "Hello World"],
    ['B', "Hello, World!"],
    ['C', "Hello, World"],
    ['D', "Hello World!"],
  ];

  return (
    <SafeAreaView style={[  styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.topHalf}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <SyntaxHighlighter language="python" style={atomOneDark} highlighter={"hljs"}>
            {codeString}
          </SyntaxHighlighter>
        </ScrollView>
      </View>
      <View style={styles.bottomHalf}>
        <Text style={styles.centeredText}>What is the output?</Text>
        <View style={styles.cardContainer}>
          {answers.map((answer, index) => (
            <Card
              key={index}
              onPress={() => alert(`Answered: ${answer[0]} : ${answer[1]}`)}
              mode="elevated"
              style={styles.card}
            >
              <Card.Title title={`${answer[0]}: ${answer[1]}`} />
            </Card>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topHalf: {
    flex: 1,
    padding: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  bottomHalf: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: 10,
  },
  centeredText: {
    textAlign: "center",
    fontSize: 25,
    paddingVertical: 20,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  card: {
    marginVertical: 10,
  },
});