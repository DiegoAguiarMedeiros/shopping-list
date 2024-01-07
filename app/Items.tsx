import { useSearchParams } from "expo-router";
import { Text } from "../components/Text";

import List from "../screens/list";
import { BottomSheetProps } from "../components/BottomSheet";

interface ItemsTabProps {
  handleCloseBottomSheetList: () => void;
  setActiveRouteHeader: React.Dispatch<React.SetStateAction<{
    name: React.ReactNode;
    left: React.ReactNode | null;
    right: React.ReactNode | null;
  }>>
}


export default function Items({
  handleCloseBottomSheetList, setActiveRouteHeader }: ItemsTabProps) {
  const { listId } = useSearchParams();


  return listId ? (
    <List
      setActiveRouteHeader={setActiveRouteHeader}
      handleCloseBottomSheetList={handleCloseBottomSheetList}
      listId={Array.isArray(listId) ? listId[0] : listId} />
  ) : (
    <></>
  );
}
