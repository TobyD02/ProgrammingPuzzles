import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import DragList from "react-native-draglist";
import SyntaxHighlighter from "react-native-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/styles/hljs";
import { Button, useTheme, Text } from "react-native-paper";
import { Stack } from "expo-router";

export default function CorrectOrder({ data, newQuestion }) {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [correct, setCorrect] = useState({});

  const theme = useTheme();

  useEffect(() => {
    // Break lines over 50 characters
    let processedLines = data[0].lines_of_code.map((line) => {
      if (line.length > 50) {
        let brokenLines = [];
        while (line.length > 50) {
          brokenLines.push(line.slice(0, 50));
          line = line.slice(50);
        }
        brokenLines.push(line); // Add the last segment
        return brokenLines; // Return as a nested array
      } else {
        return line; // Return the unbroken line as is
      }
    });

    let updatedData = { ...data[0], lines_of_code: processedLines };
    console.log(processedLines);

    setCorrect(updatedData);

    let a = [...processedLines];
    a.sort(() => Math.random() - 0.5);
    setAnswers(a);

    setLoading(false);
  }, [data]);

  function keyExtractor(str) {
    return str;
  }

  function renderItem(info) {
    const { item, onDragStart, onDragEnd, isActive } = info;

    // Check if the item is an array or a single line
    const codeLines = Array.isArray(item) ? item.flatMap((line) => (Array.isArray(line) ? line : [line])) : [item];

    // Join lines with newline characters
    const codeString = codeLines.join("\n\t");

    return (
      <TouchableOpacity
        key={item}
        onPressIn={onDragStart}
        onPressOut={onDragEnd}
        style={{
          display: "border-box",
          alignItems: "center",
          width: "100%",
          padding: 5,
          margin: 5,
          backgroundColor: "#282c34" /* Atom One Dark bg color */,
        }}>
        <SyntaxHighlighter language="python" style={[atomOneDark]} customStyle={{ width: "100%" }} highlighter={"hljs"}>
          {codeString}
        </SyntaxHighlighter>
      </TouchableOpacity>
    );
  }

  async function onReordered(fromIndex, toIndex) {
    const copy = [...answers]; // Don't modify react data in-place
    const removed = copy.splice(fromIndex, 1);

    copy.splice(toIndex, 0, removed[0]); // Now insert at the new pos
    setAnswers(copy);
  }

  const isCorrect = () => {
    console.log(JSON.stringify(answers), JSON.stringify(correct.lines_of_code));
    if (JSON.stringify(answers) == JSON.stringify(correct.lines_of_code)) {
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
        <Text style={styles.centeredText}>What is the correct order?</Text>
      </View>
      <View style={styles.bottomHalf}>
        <DragList style={{ height: "100%" }} data={answers} keyExtractor={keyExtractor} onReordered={onReordered} renderItem={renderItem} />
      </View>
      <Button mode="contained" onPress={() => isCorrect()}>
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHalf: {
    flex: 0, // Adjust this to fit your content
    padding: 10,
  },
  bottomHalf: {
    flex: 1,
  },
  centeredText: {
    textAlign: "center",
    fontSize: 25,
    paddingVertical: 20,
  },
});
