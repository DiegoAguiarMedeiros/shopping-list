import { useColorScheme, SafeAreaView, ScrollView } from "react-native";
import * as Styled from "./styles";
import { ListInterface, ListType } from "../../../../types/types";
import { BottomSheetProps } from "../../../../components/BottomSheet";

import ListGridItem from "./listGridItem";
import ITag from "../../../../Domain/Model/ITag";
import { useShoppingListContext } from "../../../../context/ShoppingList";
interface ItemProps {
  tags: string[];
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
}
export default function ListGrid({
  tags,
  setBottomSheetProps,
  handleCloseBottomSheet,
}: ItemProps) {
  const colorScheme = useColorScheme();
  const { getTagByUuid } = useShoppingListContext();
  return (
    <SafeAreaView style={{ width: "100%" }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        {tags.map((t: string) => {
          const tag = getTagByUuid(t);

          return (
            <ListGridItem
              handleCloseBottomSheet={handleCloseBottomSheet}
              setBottomSheetProps={setBottomSheetProps}
              key={"ListGridItem-" + tag.uuid}
              tag={tag}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
