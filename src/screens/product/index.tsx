import EmptyList from "../../components/EmptyList";
import { BottomSheetProps } from "../../components/BottomSheet";
import React from "react";
import ListComponent from "./list";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import I18n from "i18n-js";
import { colorTheme } from "../../../constants/Colors";
import { IProduct } from "../../Model/IProduct";

interface ProductProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  color: colorTheme;
  handleCloseBottomSheet: () => void;
  search: string;
  products: IProduct[];
  productRef: React.MutableRefObject<{
    handleAddProduct: (product: IProduct) => void;
  } | null>;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export default function Product({
  setBottomSheetProps,
  handleCloseBottomSheet,
  search,
  color,
  products,
  productRef,
  setProducts,
}: Readonly<ProductProps>) {
  return (
    <Container background={color.backgroundPrimary}>
      <ContainerInner background={color.backgroundPrimary}>
        {products && products.length > 0 ? (
          <ListComponent
            setProducts={setProducts}
            productRef={productRef}
            color={color}
            items={
              search != ""
                ? products.filter((product) =>
                    product.name.toLowerCase().includes(search.toLowerCase())
                  )
                : products
            }
            setBottomSheetProps={setBottomSheetProps}
            handleCloseBottomSheet={handleCloseBottomSheet}
          />
        ) : (
          <EmptyList color={color} mensage={I18n.t("noProductsRegistered")} />
        )}
      </ContainerInner>
    </Container>
  );
}
