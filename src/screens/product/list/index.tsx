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
    handleAddProduct: (product: IProduct) => void;
  } | null>;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export default function List({
  items,
  setBottomSheetProps,
  handleCloseBottomSheet,
  color,
  productRef,
  setProducts,
}: Readonly<ItemProps>) {
  return (
    <ListGrid
      setProducts={setProducts}
      productRef={productRef}
      color={color}
      items={items}
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
  );
}
