import { SafeAreaView, ScrollView } from "react-native";
import * as Styled from "./styles";
import React from "react";
import { ItemInterface } from "../../../types/types";
import ListGridItem from "./listGridItem";

import { BottomSheetProps } from "../../../components/BottomSheet";
import { IProduct } from "../../../Domain/Model/IProduct";
import Container from "../../../components/Container";
import ContainerInner from "../../../components/ContainerInner";
interface ListProps {
  tagUuid: string;
  listArrItems: IProduct[];
  deleteItem: (item: ItemInterface) => void;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
}

function ListGrid({
  listArrItems,
  tagUuid,
  deleteItem,
  setBottomSheetProps,
  handleCloseBottomSheet,
}: Readonly<ListProps>) {

  return (
    <Container
      background={"transparent"}
    >
      <ContainerInner>
        <SafeAreaView style={{ width: "100%" }}>
          <ScrollView style={[{ height: "100%" }]} nestedScrollEnabled>
            {listArrItems.map((item: IProduct) => (
              <ListGridItem
                key={"ListGridItem-" + item.uuid}
                setBottomSheetProps={setBottomSheetProps}
                item={item}
                tagUuid={tagUuid}
                deleteItem={deleteItem}
                handleCloseBottomSheet={handleCloseBottomSheet}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </ContainerInner>
    </Container>
  );
}

export default React.memo(ListGrid);
