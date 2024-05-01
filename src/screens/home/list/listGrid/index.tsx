import { SafeAreaView, ScrollView } from "react-native";
import * as Styled from "./styles";
import { BottomSheetProps } from "../../../../components/BottomSheet";

import ListGridItem from "./listGridItem";
import { useShoppingListContext } from "../../../../context/ShoppingList";
import { colorTheme } from "../../../../../constants/Colors";
import { IProduct } from "../../../../Model/IProduct";
import { IList } from "../../../../Model/IList";
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
export default function ListGrid({
  lists,
  setBottomSheetProps,
  handleCloseBottomSheet,
  color,
  listRef,
  listItemRef,
}: Readonly<ItemProps>) {
  const { getListByUuid } = useShoppingListContext();
  return (
    <SafeAreaView style={{ width: "100%" }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Styled.ContainerListItemListItem>
          {lists.map((l: string) => {
            const list = getListByUuid(l);

            return (
              <ListGridItem
                listItemRef={listItemRef}
                listRef={listRef}
                color={color}
                handleCloseBottomSheet={handleCloseBottomSheet}
                setBottomSheetProps={setBottomSheetProps}
                key={"ListGridItem-" + list.uuid}
                list={list}
              />
            );
          })}
        </Styled.ContainerListItemListItem>
      </ScrollView>
    </SafeAreaView>
  );
}
