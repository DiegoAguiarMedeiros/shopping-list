import { BottomSheetProps } from "../../../components/BottomSheet";
import ListGrid from "./listGrid";
import { colorTheme } from "../../../../constants/Colors";
import { IProduct } from "../../../Model/IProduct";
import ITag from "../../../Model/ITag";
interface ItemProps {
  tags: ITag[];
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  productListRef: React.MutableRefObject<{
    handleAddProduct: (product: IProduct) => void;
  } | null>;
  color: colorTheme;
  tagRef: React.RefObject<{ handleAddNewTag: (tag: ITag) => void }>;
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
