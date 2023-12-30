import { useSearchParams } from "expo-router";
import { Text } from "../components/Text";

import List from "../screens/list";
import { BottomSheetProps } from "../components/BottomSheet";

interface ItemsTabProps {
  handleCloseBottomSheetList: () => void;
}


export default function Items({
  handleCloseBottomSheetList }: ItemsTabProps) {
  const { listId } = useSearchParams();


  return listId ? (
    <List
      handleCloseBottomSheetList={handleCloseBottomSheetList}
      listId={Array.isArray(listId) ? listId[0] : listId} />
  ) : (
    <></>
  );
}
