import { SafeAreaView, ScrollView } from "react-native";
import * as Styled from "./styles";
import { BottomSheetProps } from "../../../../components/BottomSheet";

import ListGridItem from "./listGridItem";
import { useShoppingListContext } from "../../../../context/ShoppingList";
import { colorTheme } from "../../../../../constants/Colors";
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
export default function ListGrid({
  lists,
  setBottomSheetProps,
  handleCloseBottomSheet,
  color,
  listRef,
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
