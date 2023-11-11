import { useSearchParams } from "expo-router";
import { Text } from "../components/Text";

import Tags from "../screens/tags";
import { BottomSheetProps } from "../components/BottomSheet";

interface TagsTabProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  bottomSheetProps: BottomSheetProps;
  handleCloseBottomSheet: () => void;
}

export default function TagsTab({
  setBottomSheetProps,
  bottomSheetProps,
  handleCloseBottomSheet, }: TagsTabProps) {
  return (<Tags 
        setBottomSheetProps={setBottomSheetProps}
        bottomSheetProps={bottomSheetProps}
        handleCloseBottomSheet={handleCloseBottomSheet}/>)
}
