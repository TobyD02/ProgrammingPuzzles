import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DragList from "react-native-draglist";
import SyntaxHighlighter from "react-native-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/styles/hljs";
import { useTheme } from "react-native-paper";
import { Stack } from "expo-router";

const SOUND_OF_SILENCE = ["hello", "darkness", "my", "old", "friend"];

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
        brokenLines.push(line);
        return brokenLines.join("\n");
      } else {
        return line;
      }
    });

    let updatedData = { ...data[0], lines_of_code: processedLines };
    setCorrect(updatedData);

    let a = [...data[0].lines_of_code];
    a.sort(() => Math.random() - 0.5);
    setAnswers(a);

    setLoading(false);
  }, [data]);

  function keyExtractor(str) {
    return str;
  }

  function renderItem(info) {
    const { item, onDragStart, onDragEnd, isActive } = info;

    return (
      <TouchableOpacity
        key={item}
        style={{ width: "100%", height: "100px", backgroundColor: "white" }}
        onPressIn={onDragStart}
        onPressOut={onDragEnd}
      >
        <SyntaxHighlighter
          language="python"
          style={atomOneDark}
          highlighter={"hljs"}
        >
          {item}
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

  return loading ? (
    <Stack.Screen options={{ title: "Loading..." }} />
  ) : (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.topHalf}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Description:</Text>{" "}
          {correct.description}
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Input:</Text>{" "}
          {correct.input_example && correct.input_example.join(", ")}
        </Text>
      </View>
      <View style={styles.bottomHalf}>
        <DragList
          style={{ backgroundColor: "white", height: "100%" }}
          data={answers}
          keyExtractor={keyExtractor}
          onReordered={onReordered}
          renderItem={renderItem}
        />
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
    flex: 0, // Adjust this to fit your content
    padding: 10,
  },
  bottomHalf: {
    flex: 1,
  },
});
