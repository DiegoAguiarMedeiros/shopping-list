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
    handleAddNewList: (name: string) => void;
    handleRemoveItem: (uuid: string) => void;
    handleEditItem: (uuid: string, name: string) => void;
    handleCopyItem: (uuid: string, name: string) => void;
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
