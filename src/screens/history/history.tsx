import { StyleSheet } from "react-native";
import History from "./index";
import { colorTheme } from "../../../constants/Colors";

interface HistoryProps {
  color: colorTheme;
}

export default function HistoryScreen({ color }: Readonly<HistoryProps>) {
  return <History color={color} />;
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
