import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Styled from "./styles";
import React from "react";
import { ItemInterface } from "../../../types/types";
import ListGridItem from "./listGridItem";

import { BottomSheetProps } from "../../../components/BottomSheet";
import Container from "../../../components/Container";
import ContainerInner from "../../../components/ContainerInner";
import { colorTheme } from "../../../../constants/Colors";
import { IProduct } from "../../../Model/IProduct";
interface ListProps {
  tagUuid: string;
  products: IProduct[];
  deleteItem: (item: ItemInterface) => void;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: (tagUuid: string) => void;
  productRef: React.MutableRefObject<{
    handleAddProduct: (product: IProduct) => void;
    handleReloadProduct: () => void;
  } | null>;
  color: colorTheme;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

function ListGrid({
  products,
  tagUuid,
  deleteItem,
  setBottomSheetProps,
  handleCloseBottomSheet,
  productRef,
  color,
  setProducts,
}: Readonly<ListProps>) {
  return (
    <Container background={"transparent"}>
      <ContainerInner>
        <SafeAreaView style={{ width: "100%" }}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={[{ height: "100%" }]}
            nestedScrollEnabled
          >
            {products.map((product: IProduct) => {
              if (!product) return null;
              return (
                <ListGridItem
                  key={"ListGridItem-" + product.uuid}
                  products={product}
                  setBottomSheetProps={setBottomSheetProps}
                  tagUuid={tagUuid}
                  handleCloseBottomSheet={handleCloseBottomSheet}
                />
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </ContainerInner>
    </Container>
  );
}

export default React.memo(ListGrid);
