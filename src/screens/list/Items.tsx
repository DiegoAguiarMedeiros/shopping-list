import { useSearchParams } from "expo-router";
import { Text } from "../../../components/Text";

import List from "../screens/list";
import { BottomSheetProps } from "../../../components/BottomSheet";
import { colorTheme } from "../../../constants/Colors";

interface ItemsTabProps {
  handleCloseBottomSheetList: () => void;
  setActiveRouteHeader: React.Dispatch<
    React.SetStateAction<{
      name: React.ReactNode;
      left: React.ReactNode | null;
      right: React.ReactNode | null;
    }>
  >;
  color: colorTheme;
}

export default function Items({
  handleCloseBottomSheetList,
  setActiveRouteHeader,
  color,
}: ItemsTabProps) {
  const { listId } = useSearchParams();

  return listId ? (
    <List
      color={color}
      setActiveRouteHeader={setActiveRouteHeader}
      handleCloseBottomSheetList={handleCloseBottomSheetList}
      listId={Array.isArray(listId) ? listId[0] : listId}
    />
  ) : (
    <></>
  );
}
