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

  const theme = useTheme();

  useEffect(() => {
    // Process lines_of_code to ensure no line exceeds 50 characters)
    let processedLines = data[0].lines_of_code.map((line) => {
      if (line.length > 50) {
        let brokenLines = [];
        while (line.length > 50) {
          brokenLines.push(line.slice(0, 50));
          line = line.slice(50);
        }
        brokenLines.push(line);
        return brokenLines.join("\n");
      } else {
        return line;
      }
    });

    let updatedData = { ...data[0], lines_of_code: processedLines };
    setCorrect(updatedData);

    let a = data.map((d) => d.output_example);
    a.sort(() => Math.random() - 0.5);
    setAnswers(a);

    setLoading(false);
  }, [data]);

  const isCorrect = (answer) => {
    if (answer === correct.output_example) {
      alert("CORRECT!");
      newQuestion();
    } else {
      alert("WRONG!");
    }
  };

  return loading ? (
    <Stack.Screen options={{ title: "Loading..." }} />
  ) : (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.topHalf}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Description:</Text> {correct.description}
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Input:</Text> {correct.input_example && correct.input_example.join(", ")}
        </Text>
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
    padding: 10,
  },
});
