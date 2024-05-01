import { useColorScheme, SafeAreaView, ScrollView } from "react-native";
import * as Styled from "./styles";
import React, { useEffect, useState } from "react";
import { ItemInterface, TagsIterface, TotalType } from "../../../types/types";
import ListGridItem from "./listGridItem";
import { useShoppingListContext } from "../../../context/ShoppingList";
import { Text } from "../../../components/Text";

import Button from "../../../components/Button";

import { BottomSheetProps } from "../../../components/BottomSheet";
import BottomSheet from "../../../components/BottomSheet";
import { removeUndefinedFromArray } from "../../../utils/functions";
import { IProduct } from "../../../Model/IProduct";
import Container from "../../../components/Container";
import ContainerInner from "../../../components/ContainerInner";
import {
  GridItemWrapperCol,
  GridItemWrapperInner,
  GridItemWrapperRow,
} from "../../../components/GridItemInner";
import I18n from "i18n-js";
import { IList } from "../../../Model/IList";
import { colorTheme } from "../../../../constants/Colors";
interface ListProps {
  listId: string;
  list: IProduct[];
  color: colorTheme;
  total: TotalType;
  filterUpdate: () => void;
  setListArrItems: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

function ListGrid({
  list,
  listId,
  color,
  total,
  filterUpdate,
  setListArrItems,
}: Readonly<ListProps>) {
  const { getProductByUuid, getCurrency } = useShoppingListContext();

  const [active, setActive] = useState("");

  const handleOpen = (uuid: string) => {
    setActive(uuid);
  };
  const handleClose = () => {
    setActive("");
  };

  return (
    <Container background={"transparent"}>
      <ContainerInner>
        <GridItemWrapperRow height={90}>
          <SafeAreaView style={{ flex: 1, width: "100%" }}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ flexGrow: 1 }}
              nestedScrollEnabled
            >
              {list.map((item) => {
                return (
                  <ListGridItem
                    filterUpdate={filterUpdate}
                    color={color}
                    key={"ListGridItem-" + item.uuid}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    item={item}
                    listId={listId}
                    active={active}
                    setListArrItems={setListArrItems}
                  />
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </GridItemWrapperRow>
        <GridItemWrapperRow height={10}>
          <GridItemWrapperInner width={50} height={100} justify="flex-start">
            <Text color={color.text}>
              {I18n.t("totalItems")}: {total.un}
            </Text>
          </GridItemWrapperInner>
          <GridItemWrapperInner width={50} height={100} justify="flex-start">
            <Text color={color.text} align="right">
              {I18n.t("total")}: {getCurrency()}{" "}
              {total.total.toFixed(2).replace(".", ",")}
            </Text>
          </GridItemWrapperInner>
        </GridItemWrapperRow>
      </ContainerInner>
    </Container>
  );
}

export default React.memo(ListGrid);
