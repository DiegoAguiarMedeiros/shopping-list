import { BottomSheetProps } from "../../../components/BottomSheet";
import ListGrid from "./listGrid";
import { colorTheme } from "../../../../constants/Colors";
import { IProduct } from "../../../Model/IProduct";
interface ItemProps {
  tags: string[];
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  productListRef: React.MutableRefObject<{
    handleAddProduct: (product: IProduct) => void;
  } | null>;
  color: colorTheme;
  tagRef: React.RefObject<{ handleAddNewTag: (tag: string) => void }>;
}

export default function List({
  tags,
  setBottomSheetProps,
  handleCloseBottomSheet,
  productListRef,
  tagRef,
  color,
}: Readonly<ItemProps>) {
  return (
    <ListGrid
      color={color}
      tagRef={tagRef}
      productListRef={productListRef}
      tags={tags}
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
  );
}
