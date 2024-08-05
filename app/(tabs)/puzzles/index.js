import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import SyntaxHighlighter from "react-native-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/styles/hljs";
import { getPuzzleData, pushPuzzle } from "../../utils/api_interface";

import CorrectOrder from "./question_types/correct_order";
import MissingLine from "./question_types/missing_line";
import WhichDescription from "./question_types/which_description";
import WhichOutput from "./question_types/which_output";
import {Stack} from "expo-router";

export default function Page() {
  const theme = useTheme();
  const [data, setData] = useState({});
  // const [answer, setAnswer] = useState({});
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState(0);
  const [questionComponents, setQuestionComponents] = useState([])

  const newQuestion = () => {
    getPuzzleData().then(({ data, error }) => {
      // console.log(data, error)
      if (error) {
        console.log("error", error);
      } else {
        setQuestionComponents([<MissingLine data={data} newQuestion={newQuestion} />, <WhichOutput data={data} newQuestion={newQuestion} />, <WhichDescription data={data} newQuestion={newQuestion} />, <CorrectOrder />])
        
        setQuestion(Math.floor(Math.random() * 4));
        setLoading(false);
      }
    });
  }

  useEffect(() => {
    newQuestion()
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ headerShown: true}} />
      {loading ? (
        <Text>Loading... 1</Text>
      ) : (
        questionComponents[question]
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
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
    padding: 10,
  },
});


const prev = () => {
  return(
    <View style={styles.topHalf}>
          <Text>Description: {data.description && data.description}</Text>
          <Text>Input: {data.input_example && data.input_example.join(", ")}</Text>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <SyntaxHighlighter language="python" style={atomOneDark} highlighter={"hljs"}>
              {data.lines_of_code && data.lines_of_code.join("\n")}
            </SyntaxHighlighter>
          </ScrollView>
          <View style={styles.bottomHalf}>
            <Text style={styles.centeredText}>{answer.question}</Text>
            <View style={styles.cardContainer}>
              {answer.correct_answer && (
                <Card style={styles.card}>
                  <Text>Correct Answer: {JSON.stringify(answer.correct_answer)}</Text>
                </Card>
              )}
              {answer.incorrect_answers && answer.incorrect_answers.map((incorrectAnswer, index) => (
                <Card key={index} style={styles.card}>
                  <Text>Incorrect Answer: {JSON.stringify(incorrectAnswer)}</Text>
                </Card>
              ))}
              {answer.shuffled_lines && answer.shuffled_lines.map((line, index) => (
                <Card key={index} style={styles.card}>
                  <Text>Line {index + 1}: {line}</Text>
                </Card>
              ))}
            </View>
          </View>
        </View>
  )
}