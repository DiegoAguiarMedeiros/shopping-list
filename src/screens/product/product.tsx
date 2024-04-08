import Product from "./index";
import { BottomSheetProps } from "../../components/BottomSheet";
import { useImperativeHandle, useState } from "react";
import { colorTheme } from "../../../constants/Colors";
import { useShoppingListContext } from "../../context/ShoppingList";
import React from "react";
import { IProduct } from "../../Model/IProduct";

interface ProductTabProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  search: string;
  color: colorTheme;
}

const ProductTab = React.forwardRef(
  (
    {
      setBottomSheetProps,
      color,
      handleCloseBottomSheet,
      search,
    }: ProductTabProps,
    ref: any
  ) => {
    const { getAllProductsObjects } = useShoppingListContext();

    const [products, setProducts] = useState<IProduct[]>(
      getAllProductsObjects()
    );

    useImperativeHandle(ref, () => ({
      handleAddProduct(product: IProduct) {
        setProducts((prev) => [...prev, product]);
      },
    }));

    return (
      <Product
        productRef={ref}
        products={products}
        search={search}
        setBottomSheetProps={setBottomSheetProps}
        color={color}
        handleCloseBottomSheet={handleCloseBottomSheet}
      />
    );
  }
);

export default ProductTab;
