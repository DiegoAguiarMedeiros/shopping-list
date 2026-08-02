import { View, StyleSheet } from "react-native";

const InputContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 65,
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
});

export default InputContainer;