import { SafeAreaView, ScrollView } from "react-native";
import { BottomSheetProps } from "../../../../components/BottomSheet";

import ListGridItem from "./listGridItem";
import { useShoppingListContext } from "../../../../context/ShoppingList";
interface ItemProps {
  tags: string[];
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  productListRef: React.MutableRefObject<{
    handleAddProduct: (uuid: string) => void;
  } | null>;

  tagRef: React.RefObject<{ handleAddNewTag: (tag: string) => void }>;
}
export default function ListGrid({
  tags,
  setBottomSheetProps,
  handleCloseBottomSheet,
  productListRef,
  tagRef,
}: Readonly<ItemProps>) {
  const { getTagByUuid } = useShoppingListContext();
  return (
    <SafeAreaView style={{ width: "100%" }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        {tags.map((t: string) => {
          const tag = getTagByUuid(t);

          return (
            <ListGridItem
              tagRef={tagRef}
              productListRef={productListRef}
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
