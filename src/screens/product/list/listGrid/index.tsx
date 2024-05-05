import { SafeAreaView, ScrollView } from "react-native";
import { BottomSheetProps } from "../../../../components/BottomSheet";

import ListGridItem from "./listGridItem";
import { IProduct } from "../../../../Model/IProduct";
import { colorTheme } from "../../../../../constants/Colors";
interface ItemProps {
  items: IProduct[];
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  color: colorTheme;
  productRef: React.MutableRefObject<{
    handleAddProduct: (product: IProduct) => void;
  } | null>;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}
export default function ListGrid({
  items,
  setBottomSheetProps,
  handleCloseBottomSheet,
  color,
  productRef,
  setProducts,
}: Readonly<ItemProps>) {
  return (
    <SafeAreaView style={{ width: "100%" }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        {items.map((item: IProduct) => (
          <ListGridItem
            setProducts={setProducts}
            productRef={productRef}
            color={color}
            handleCloseBottomSheet={handleCloseBottomSheet}
            setBottomSheetProps={setBottomSheetProps}
            key={"ListGridItem-" + item.uuid}
            item={item}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
