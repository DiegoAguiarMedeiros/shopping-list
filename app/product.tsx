import Product from "../src/screens/product";
import { BottomSheetProps } from "../src/components/BottomSheet";
import { useImperativeHandle, useState } from "react";
import { colorTheme } from "../constants/Colors";
import { useShoppingListContext } from "../src/context/ShoppingList";
import React from "react";
import { IProduct } from "../src/Model/IProduct";
import { sortArrayOfObjects } from "../src/utils/functions";

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
        console.log("handleAddProduct");
        setProducts((prev) => sortArrayOfObjects([...prev, product], "name"));
      },
    }));

    return (
      <Product
        setProducts={setProducts}
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
