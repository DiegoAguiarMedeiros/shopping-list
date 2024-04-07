import { StyleSheet } from "react-native";
import { Text } from "../../../components/Text";
import Home from "../screens/home";

import { BottomSheetProps } from "../../../components/BottomSheet";
import { useEffect } from "react";
import { colorTheme } from "../../../constants/Colors";
interface TabOneScreenProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  color: colorTheme;
}

export default function TabOneScreen({
  setBottomSheetProps,
  handleCloseBottomSheet,
  color,
}: Readonly<TabOneScreenProps>) {
  return (
    <Home
      color={color}
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
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
