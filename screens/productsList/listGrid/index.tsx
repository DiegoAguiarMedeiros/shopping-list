import { SafeAreaView, ScrollView } from "react-native";
import * as Styled from "./styles";
import React from "react";
import { ItemInterface } from "../../../types/types";
import ListGridItem from "./listGridItem";

import { BottomSheetProps } from "../../../components/BottomSheet";
import { IProduct } from "../../../Domain/Model/IProduct";
import Container from "../../../components/Container";
import ContainerInner from "../../../components/ContainerInner";
import { useShoppingListContext } from "../../../context/ShoppingList";
interface ListProps {
  tagUuid: string;
  products: string[];
  deleteItem: (item: ItemInterface) => void;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: (tagUuid: string) => void;
}

function ListGrid({
  products,
  tagUuid,
  deleteItem,
  setBottomSheetProps,
  handleCloseBottomSheet,
}: Readonly<ListProps>) {
  const { getProductByUuid } = useShoppingListContext();
  return (
    <Container background={"transparent"}>
      <ContainerInner>
        <SafeAreaView style={{ width: "100%" }}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={[{ height: "100%" }]}
            nestedScrollEnabled
          >
            {products.map((p: string) => {
              const product = getProductByUuid(p);
              if (!product) return null;
              return (
                <ListGridItem
                  key={"ListGridItem-" + product.uuid}
                  setBottomSheetProps={setBottomSheetProps}
                  item={product}
                  tagUuid={tagUuid}
                  deleteItem={deleteItem}
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
