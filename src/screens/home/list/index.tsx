import { colorTheme } from "../../../../constants/Colors";
import { IList } from "../../../Model/IList";
import { IProduct } from "../../../Model/IProduct";
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
  listItemRef: React.MutableRefObject<{
    handleAddItem: (list: IList) => void;
  } | null>;
}

export default function List({
  lists,
  setBottomSheetProps,
  handleCloseBottomSheet,
  color,
  listRef,
  listItemRef,
}: Readonly<ItemProps>) {
  return (
    <ListGrid
      listItemRef={listItemRef}
      listRef={listRef}
      color={color}
      lists={lists}
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
  );
}
