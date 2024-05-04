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
    handleAddProduct: (uuid: string) => void;
  } | null>;
}
export default function ListGrid({
  items,
  setBottomSheetProps,
  handleCloseBottomSheet,
  color,
  productRef,
}: Readonly<ItemProps>) {
  return (
    <SafeAreaView style={{ width: "100%" }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        {items.map((item: IProduct) => (
          <ListGridItem
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
