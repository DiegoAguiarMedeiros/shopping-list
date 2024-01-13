import { useColorScheme, SafeAreaView, ScrollView } from "react-native";
import Colors from "../../../constants/Colors";
import * as Styled from "./styles";
import React, { useEffect, useState } from "react";
import { ItemInterface, TagsIterface } from "../../../types/types";
import ListGridItem from "./listGridItem";
import { useShoppingListContext } from "../../../context/ShoppingList";
import { Text } from "../../../components/Text";

import Button from "../../../components/Button";

import { BottomSheetProps } from "../../../components/BottomSheet";
import BottomSheet from "../../../components/BottomSheet";
import { removeUndefinedFromArray } from "../../../utils/functions";
import ITag from "../../../Domain/Model/ITag";
import { IProduct } from "../../../Domain/Model/IProduct";
import getTotalQuantityAmountByListUuidController from "../../../Domain/UseCases/List/GetTotalQuantityAmountByListUuid";
import getTotalAmountByListProductUuidController from "../../../Domain/UseCases/List/GetTotalAmountByListUuid";
import getTotalQuantityWithoutAmountByListUuidController from "../../../Domain/UseCases/List/GetTotalQuantityWithoutAmountByListUuid";
import Container from "../../../components/Container";
import ContainerInner from "../../../components/ContainerInner";
import { GridItemWrapperCol, GridItemWrapperRow } from "../../../components/GridItemInner";
interface ListProps {
  listId: string;
  listArrItems: IProduct[];
}

function ListGrid({
  listArrItems,
  listId,
}: Readonly<ListProps>) {
  const { list } = useShoppingListContext();

  const [active, setActive] = useState("");


  const colorScheme = useColorScheme();
  const totalQuantity = getTotalQuantityAmountByListUuidController.handle(listId, listArrItems);
  const total = getTotalAmountByListProductUuidController.handle(listId, listArrItems);



  const handleOpen = (uuid: string) => {
    setActive(uuid);
  };
  const handleClose = () => {
    setActive("");
  };

  return (
    <Container
      background={"transparent"}
    >


      <ContainerInner>
        <GridItemWrapperRow height={88} >
          <SafeAreaView style={{ flex: 1, width: "100%" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} nestedScrollEnabled>
              {listArrItems.map((item: IProduct) => (
                <ListGridItem
                  key={"ListGridItem-" + item.uuid}
                  handleOpen={handleOpen}
                  handleClose={handleClose}
                  item={item}
                  listId={listId}
                  active={active}
                />
              ))}
            </ScrollView>
          </SafeAreaView>
        </GridItemWrapperRow>
        <GridItemWrapperRow height={4} >
          <Styled.ContainerItemTotalUnitText
            text={Colors[colorScheme ?? "light"].backgroundSecondary}
          >
            <Text
              color={
                colorScheme !== "dark"
                  ? Colors[colorScheme ?? "light"].black
                  : Colors[colorScheme ?? "light"].white
              }
            >
              Total Items: {totalQuantity}
            </Text>
          </Styled.ContainerItemTotalUnitText>
          <Styled.ContainerItemTotalText
            text={Colors[colorScheme ?? "light"].backgroundPrimary}
          >
            <Text
              color={
                colorScheme !== "dark"
                  ? Colors[colorScheme ?? "light"].black
                  : Colors[colorScheme ?? "light"].white
              }
            >
              Total: R$ {total.toFixed(2).replace(".", ",")}
            </Text>
          </Styled.ContainerItemTotalText>
        </GridItemWrapperRow>
      </ContainerInner>
    </Container>
  );
}

export default React.memo(ListGrid);
