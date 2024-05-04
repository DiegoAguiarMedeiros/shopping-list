import { BottomSheetProps } from "../../../components/BottomSheet";
import ListGrid from "./listGrid";
import { IProduct } from "../../../Model/IProduct";
import { colorTheme } from "../../../../constants/Colors";
interface ItemProps {
  items: IProduct[];
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  color: colorTheme;
  productRef: React.MutableRefObject<{
    handleAddProduct: (uuid: string) => void;
  } | null>;
}

export default function List({
  items,
  setBottomSheetProps,
  handleCloseBottomSheet,
  color,
  productRef,
}: Readonly<ItemProps>) {
  return (
    <ListGrid
      productRef={productRef}
      color={color}
      items={items}
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
  );
}
