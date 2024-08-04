import { View, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import SyntaxHighlighter from "react-native-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/styles/hljs";
import { Card } from "react-native-paper";

export default function MissingLine({ data, newQuestion }) {

  console.log(data)
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
