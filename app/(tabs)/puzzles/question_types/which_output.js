import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import SyntaxHighlighter from "react-native-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/styles/hljs";
import { Stack } from "expo-router";

export default function WhichOutput({ data, newQuestion }) {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [correct, setCorrect] = useState({});

  const theme = useTheme()

  useEffect(() => {
    if (data && data.length > 0) {
      setCorrect(data[0]);

      let a = data.map((d) => d.output_example);
      a.sort(() => Math.random() - 0.5);
      setAnswers(a);

      setLoading(false);
    }
  }, [data]);

  const isCorrect = (answer) => {
    if (answer === correct.output_example) {
      alert("CORRECT!");
      newQuestion();
    } else {
      alert("WRONG!");
    }
  };

  return (
    loading ? (
      <Stack.Screen options={{ title: "Loading..." }} />
    ) : (
      <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
        <View style={styles.topHalf}>
          <Text>Description: {correct.description}</Text>
          <Text>Input: {correct.input_example && correct.input_example.join(", ")}</Text>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <SyntaxHighlighter language="python" style={atomOneDark} highlighter={"hljs"}>
              {correct.lines_of_code && correct.lines_of_code.join("\n")}
            </SyntaxHighlighter>
          </ScrollView>
        </View>
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
    )
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
