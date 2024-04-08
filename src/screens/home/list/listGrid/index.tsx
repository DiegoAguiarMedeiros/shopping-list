import { SafeAreaView, ScrollView } from "react-native";
import * as Styled from "./styles";
import { BottomSheetProps } from "../../../../components/BottomSheet";

import ListGridItem from "./listGridItem";
import { useShoppingListContext } from "../../../../context/ShoppingList";
interface ItemProps {
  lists: string[];
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
}
export default function ListGrid({
  lists,
  setBottomSheetProps,
  handleCloseBottomSheet,
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
