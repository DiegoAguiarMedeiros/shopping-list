import { StyleSheet } from "react-native";
import { Text } from "../components/Text";
import Home from "../screens/home";

import { BottomSheetProps } from "../components/BottomSheet";
import { useEffect } from "react";
interface TabOneScreenProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  bottomSheetProps: BottomSheetProps;
  handleCloseBottomSheet: () => void;
}

export default function TabOneScreen({
  setBottomSheetProps,
  bottomSheetProps,
  handleCloseBottomSheet,
}: TabOneScreenProps) {



  return (
    <Home
      setBottomSheetProps={setBottomSheetProps}
      bottomSheetProps={bottomSheetProps}
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
