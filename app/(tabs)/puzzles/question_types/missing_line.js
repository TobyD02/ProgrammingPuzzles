import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import SyntaxHighlighter from "react-native-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/styles/hljs";
import { Stack } from "expo-router";

export default function MissingLine({ data, newQuestion }) {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [correct, setCorrect] = useState({});

  const theme = useTheme();

  useEffect(() => {
    const selectable_lines = data[0].lines_of_code.slice(1);
    const missing_line_index = Math.floor(Math.random() * selectable_lines.length);
    const missing_line = selectable_lines[missing_line_index];

    // Process lines_of_code to ensure no line exceeds 50 characters)
    let processedLines = data[0].lines_of_code.map((line, index) => {
      if (line == missing_line) {
        return line.match(/^\s*/)[0] + ">-- missing line --< ";
      }
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

    let updatedData = { ...data[0], lines_of_code: processedLines, missing_line: missing_line };

    setCorrect(updatedData);

    let is_last_line = false;
    if (missing_line_index == selectable_lines.length - 1) is_last_line = true;

    let a = [missing_line.trimStart()];

    data.forEach((d, index) => {
      if (index == 0) return;
      if (is_last_line) {
        a.push(d.lines_of_code[d.lines_of_code.length - 1].trimStart());
      } else {
        let selectable_lines = d.lines_of_code.slice(1);
        let line_Index = Math.floor(Math.random() * selectable_lines.length);
        a.push(selectable_lines[line_Index].trimStart());
      }
    });

    a.sort(() => Math.random() - 0.5);
    setAnswers(a);

    setLoading(false);
  }, [data]);

  const isCorrect = (answer) => {
    if (answer === correct.missing_line.trimStart()) {
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
        <Text style={styles.centeredText}>What is the missing line?</Text>
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
