import { useSearchParams } from "expo-router";
import { Text } from "../components/Text";

import List from "../screens/list";
import { BottomSheetProps } from "../components/BottomSheet";

interface ItemsTabProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  bottomSheetProps: BottomSheetProps;
  handleCloseBottomSheet: () => void;
  handleCloseBottomSheetList: () => void;
}


export default function Items({
  setBottomSheetProps,
  bottomSheetProps,
  handleCloseBottomSheet,
  handleCloseBottomSheetList }: ItemsTabProps) {
  const { listId } = useSearchParams();


  return listId ? (
    <List setBottomSheetProps={setBottomSheetProps}
      bottomSheetProps={bottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
      handleCloseBottomSheetList={handleCloseBottomSheetList}
      listId={Array.isArray(listId) ? listId[0] : listId} />
  ) : (
    <></>
  );
}
