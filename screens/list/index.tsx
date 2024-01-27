import { TouchableHighlight, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import React, { useEffect, useState } from "react";
import { useShoppingListContext } from "../../context/ShoppingList";
import {
  ItemInterface,
  ListItemAmountInterface,
  ListItemInterface,
  ListType,
} from "../../types/types";
import {
  getTagsFromListItemInterface,
  removeDuplicates,
  removeUndefinedFromArray,
} from "../../utils/functions";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import EmptyList from "../../components/EmptyList";
import ListGrid from "./listGrid";
import CircleProgress from "../../components/CircleProgress";
import FilterButtons from "../../components/FilterButtons";
import { Title, Text } from "../../components/Text";
import BottomSheet, { BottomSheetProps } from "../../components/BottomSheet";
import Button from "../../components/Button";
import NewItemForm from "../../components/NewItemForm";
import getListProductController from "../../Domain/UseCases/ListProduct/GetListProductByUuid";
import getTotalQuantityAmountByListUuidController from "../../Domain/UseCases/List/GetTotalQuantityAmountByListUuid";
import getTotalAmountByListUuidController from "../../Domain/UseCases/List/GetTotalAmountByListUuid";
import getTagUuidByTagNameController from "../../Domain/UseCases/Tag/GetTagUuidByTagName";
import getTotalQuantityWithoutAmountByListUuidController from "../../Domain/UseCases/List/GetTotalQuantityWithoutAmountByListUuid";
import getTagsController from "../../Domain/UseCases/ListProduct/GetTagsByProductUuidArray";
import Container from "../../components/Container";
import Header from "../../components/Header";
import ContainerInner from "../../components/ContainerInner";
import I18n from "i18n-js";
type TotalType = {
  amount: number;
  un: number;
};

interface ListProps {
  listId: string;
  handleCloseBottomSheetList: () => void;
  setActiveRouteHeader: React.Dispatch<
    React.SetStateAction<{
      name: React.ReactNode;
      left: React.ReactNode | null;
      right: React.ReactNode | null;
    }>
  >;
}

export default function List({
  listId,
  handleCloseBottomSheetList,
  setActiveRouteHeader,
}: Readonly<ListProps>) {
  const colorScheme = useColorScheme();
  const { list, listProduct, amount, getTheme } = useShoppingListContext();
  const selectedItem = list.find((i) => i.uuid === listId);
  const [tags, setTags] = useState(
    selectedItem?.tags ? ["Todos", ...selectedItem?.tags] : []
  );
  const [listArr, setListArr] = useState(selectedItem);

  const [listArrItems, setListArrItems] = useState(
    getListProductController.handle(
      selectedItem?.items ? selectedItem?.items : []
    )
  );

  const totalQuantity =
    getTotalQuantityAmountByListUuidController.handle(listId);

  const [filter, setFilter] = useState("Todos");
  const [total, setTotal] = useState<TotalType>({
    amount: 0,
    un: 0,
  });
  const router = useRouter();

  const returnToHome = () => {
    handleCloseBottomSheetList();
    router.push({ pathname: "/home" });
  };
  const attHeader = (amount: number, un: number) => {
    setActiveRouteHeader({
      left: (
        <TouchableHighlight
          underlayColor={Colors[getTheme()].primary}
          style={{ marginLeft: 20, marginRight: 10 }}
          onPress={() => returnToHome()}
        >
          <FontAwesome
            name="angle-left"
            size={35}
            color={Colors[getTheme()].white}
          />
        </TouchableHighlight>
      ),
      name: (
        <Title color={Colors[getTheme()].white}>{selectedItem?.name!}</Title>
      ),
      right: (
        <Styled.Container>
          <CircleProgress
            activeStrokeColor={Colors[getTheme()].circularHeaderFilled}
            titleColor={Colors[getTheme()].circularHeaderText}
            circleBackgroundColor={Colors[getTheme()].circularHeaderBackground}
            filled={amount}
            progress={un && amount ? amount : 0}
            total={un}
            size={24}
          />
        </Styled.Container>
      ),
    });
  };

  useEffect(() => {
    const productsList = getListProductController.handle(
      selectedItem?.items ? selectedItem?.items : []
    );
    setTags(selectedItem?.tags ? ["Todos", ...selectedItem?.tags] : []);

    if (filter === "Todos") {
      setListArrItems(productsList);

      const newTotal: TotalType = {
        un: getTotalQuantityAmountByListUuidController.handle(listId),
        amount:
          getTotalQuantityWithoutAmountByListUuidController.handle(listId),
      };
      setTotal(newTotal);
      attHeader(newTotal.amount, newTotal.un);
      return;
    }

    const filteredProductsList = productsList.filter(
      (product) => getTagUuidByTagNameController.handle(filter) === product.tag
    );
    const newTotal: TotalType = {
      un: getTotalQuantityAmountByListUuidController.handle(
        listId,
        filteredProductsList
      ),
      amount: getTotalQuantityWithoutAmountByListUuidController.handle(
        listId,
        filteredProductsList
      ),
    };

    setTotal(newTotal);
    setListArrItems(filteredProductsList);
    attHeader(newTotal.amount, newTotal.un);

    return () => {};
  }, [filter, amount, listProduct, list]);

  return (
    <Container noPadding>
      <Header
        background={Colors[getTheme()].backgroundPrimary}
        bottom={
          listArr && listArr.tags.length > 0 ? (
            <FilterButtons tags={tags} filter={filter} setFilter={setFilter} />
          ) : null
        }
      />
      <ContainerInner
        justify="center"
        background={Colors[getTheme()].backgroundPrimary}
      >
        {listArrItems.length > 0 ? (
          <ListGrid listArrItems={listArrItems} listId={listId} />
        ) : (
          <EmptyList mensage={I18n.t("noItemsInTheList")} />
        )}
      </ContainerInner>
    </Container>
  );
}

