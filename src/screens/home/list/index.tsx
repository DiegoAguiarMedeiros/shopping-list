import { colorTheme } from "../../../../constants/Colors";
import { BottomSheetProps } from "../../../components/BottomSheet";
import ListGrid from "./listGrid";
interface ItemProps {
  lists: string[];
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  color: colorTheme;
  listRef: React.MutableRefObject<{
    handleAddNewList: (uuid: string) => void;
    handleAddNewListArray: (list: string[]) => void;
  } | null>;
}

export default function List({
  lists,
  setBottomSheetProps,
  handleCloseBottomSheet,
  color,
  listRef,
}: Readonly<ItemProps>) {
  return (
    <ListGrid
      listRef={listRef}
      color={color}
      lists={lists}
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
  );
}
