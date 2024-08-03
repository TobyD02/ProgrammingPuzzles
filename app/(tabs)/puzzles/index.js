import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import SyntaxHighlighter from "react-native-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/styles/hljs";
import { getPuzzleData } from "../../utils/api_interface";

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

  useEffect(() => {
    getPuzzleData().then(({ data, error }) => {
      if (error) {
        console.log("error", error);
      } else {
        console.log("data: ", data);
        setQuestionComponents([<MissingLine />, <WhichOutput data={data[0]} />, <WhichDescription />, <CorrectOrder />])
        getQuestion(data[0]);
        setLoading(false);
      }
    });
  }, []);

  const getQuestion = (data) => {
    const questionType = Math.floor(Math.random() * 4); // Randomly select a question type

    switch (questionType) {
      case 0: // Missing line of code
        const answerIndex = Math.floor(Math.random() * data.lines_of_code.length);
        setAnswer({
          question_type: 0,
          question: "What is the missing line of code?",
          correct_answer: data.lines_of_code[answerIndex],
          incorrect_answers: data.lines_of_code.filter((_, index) => index !== answerIndex).slice(0, 3)
        });

        setData({
          description: data.description,
          input_example: data.input_example,
          lines_of_code: data.lines_of_code.filter((_, index) => index !== answerIndex),
        });
        break;

      case 1: // What is the output
        // setAnswer({
        //   question_type: 1,
        //   question: "What is the output?",
        //   correct_answer: data.output_example, // Placeholder
        //   incorrect_answers: ["incorrect_output1", "incorrect_output2", "incorrect_output3"]
        // });
        // setData(data);
        // break;
        setQuestion(1)

      case 2: // What is the correct description
        setAnswer({
          question_type: 2,
          question: "What is the correct description?",
          correct_answer: data.description,
          incorrect_answers: ["Incorrect description 1", "Incorrect description 2", "Incorrect description 3"]
        });
        setData(data);
        break;

      case 3: // Put the lines of code in correct order
        setAnswer({
          question_type: 3,
          question: "Put the lines of code in the correct order",
          correct_answer: data.lines_of_code,
          shuffled_lines: data.lines_of_code.sort(() => Math.random() - 0.5) // Shuffled lines
        });
        setData(data);
        break;

      default:
        break;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ headerShown: true}} />
      {!loading ? (
        <Text>Loading...</Text>
      ) : (
        questionComponents[1]
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