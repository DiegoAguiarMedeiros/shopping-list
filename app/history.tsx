import { StyleSheet } from "react-native";
import { Text } from "../components/Text";
import History from "../screens/history";

export default function TabThreeScreen() {
  return <History />;
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
