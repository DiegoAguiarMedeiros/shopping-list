import { lazy, Suspense } from "react";
import { StyleSheet } from "react-native";
import { Text } from "../components/Text";
const History = lazy(() => import("../screens/history"));
const View = lazy(() => import("../components/Themed"));

export default function TabThreeScreen() {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <View style={styles.container}>
        <History />
      </View>
    </Suspense>
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
