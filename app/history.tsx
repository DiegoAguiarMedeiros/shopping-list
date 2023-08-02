import { StyleSheet } from "react-native";
import { Text } from "../components/Text";
import History from "../screens/history";
import View from "../components/Themed";

export default function TabThreeScreen() {
  return (
    <View style={styles.container}>
      <History />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
