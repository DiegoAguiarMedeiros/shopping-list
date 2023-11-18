import { useSearchParams } from "expo-router";
import { Text } from "../components/Text";

import Product from "../screens/product";
import { BottomSheetProps } from "../components/BottomSheet";


interface ProductTabProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  bottomSheetProps: BottomSheetProps;
  handleCloseBottomSheet: () => void;
}


export default function ProductTab({
  setBottomSheetProps,
  bottomSheetProps,
  handleCloseBottomSheet, }: ProductTabProps) {
  return (<Product
    setBottomSheetProps={setBottomSheetProps}
    bottomSheetProps={bottomSheetProps}
    handleCloseBottomSheet={handleCloseBottomSheet} />)
}
