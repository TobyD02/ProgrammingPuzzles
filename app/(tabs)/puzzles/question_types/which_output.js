import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import SyntaxHighlighter from "react-native-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/styles/hljs";
import {Stack} from "expo-router"

export default function WhichOutput({ data }) {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    const incorrect_answers = getIncorrectAnswers(data.output_type)

    let a = [...incorrect_answers, data.output_example];

    answers.sort(() => Math.random() - 0.5);
    setAnswers(a);

    setLoading(false);
  }, []);

  const isCorrect = (answer) => {
    console.log(answer === answer.correct_answer, answer, data.output_example);
    if (answer === data.output_example) {
      alert("CORRECT!");
    } else {
      alert("WRONG!");
    }
  };

  return (
    <View style={styles.topHalf}>
      <Text>Description: {data.description}</Text>
      <Text>Input: {data.input_example && data.input_example.join(", ")}</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SyntaxHighlighter language="python" style={atomOneDark} highlighter={"hljs"}>
          {data.lines_of_code && data.lines_of_code.join("\n")}
        </SyntaxHighlighter>
      </ScrollView>
      <View style={styles.bottomHalf}>
        <Text style={styles.centeredText}>What is the correct output?</Text>
        <View style={styles.cardContainer}>
          {answers.map((answer, index) => (
            <Card key={index} style={styles.card} onPress={() => isCorrect(answer)}>
              <Text>{answer}</Text>
            </Card>
          ))}
        </View>
      </View>
    </View>
  );
}

const getIncorrectAnswers = (outputType) => {
  if (outputType == "integer") {
    const incorrectAnswers = [];
    for (let i = 0; i < 3; i++) {
      incorrectAnswers.push(Math.floor(Math.random() * 1000));
    }
    return incorrectAnswers;
  }
};

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
