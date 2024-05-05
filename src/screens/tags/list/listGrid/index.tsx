import { SafeAreaView, ScrollView } from "react-native";
import { BottomSheetProps } from "../../../../components/BottomSheet";

import ListGridItem from "./listGridItem";
import { useShoppingListContext } from "../../../../context/ShoppingList";
import { colorTheme } from "../../../../../constants/Colors";
import { IProduct } from "../../../../Model/IProduct";
import ITag from "../../../../Model/ITag";
interface ItemProps {
  tags: ITag[];
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  productListRef: React.MutableRefObject<{
    handleAddProduct: (product: IProduct) => void;
  } | null>;

  tagRef: React.RefObject<{ handleAddNewTag: (tag: ITag) => void }>;
  color: colorTheme;
}
export default function ListGrid({
  tags,
  setBottomSheetProps,
  handleCloseBottomSheet,
  productListRef,
  tagRef,
  color,
}: Readonly<ItemProps>) {
  const { getTagByUuid } = useShoppingListContext();
  return (
    <SafeAreaView style={{ width: "100%" }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        {tags.map((tag: ITag) => {

          return (
            <ListGridItem
              color={color}
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
