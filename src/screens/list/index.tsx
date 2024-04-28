import { TouchableHighlight } from "react-native";

import * as Styled from "./styles";
import React, { useEffect, useState } from "react";
import { useShoppingListContext } from "../../context/ShoppingList";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import EmptyList from "../../components/EmptyList";
import ListGrid from "./listGrid";
import CircleProgress from "../../components/CircleProgress";
import FilterButtons from "../../components/FilterButtons";
import { Title } from "../../components/Text";

import Container from "../../components/Container";
import Header from "../../components/Header";
import ContainerInner from "../../components/ContainerInner";
import I18n from "i18n-js";
import { colorTheme } from "../../../constants/Colors";
import { IList } from "../../Model/IList";
import { IProduct } from "../../Model/IProduct";
type TotalType = {
  amount: number;
  un: number;
};

interface ListProps {
  list: IList;
  listId: string;
  handleCloseBottomSheetList: () => void;
  setActiveRouteHeader: React.Dispatch<
    React.SetStateAction<{
      name: React.ReactNode;
      left: React.ReactNode | null;
      right: React.ReactNode | null;
    }>
  >;
  color: colorTheme;
}

export default function List({
  list,
  listId,
  handleCloseBottomSheetList,
  setActiveRouteHeader,
  color,
}: Readonly<ListProps>) {
  const {
    getTotalQuantityAmountByListUuid,
    getTotalQuantityWithoutAmountByListUuid,
    getTagByUuid,
    getProductByUuid,
    getTagUuidByTagName,
  } = useShoppingListContext();
  const [tags, setTags] = useState(list?.tags ? ["Todos", ...list.tags] : []);
  const totalQuantity = getTotalQuantityAmountByListUuid(list.uuid);
  const productsList: IProduct[] = [];
  list.items.forEach((i: string) => {
    const result = getProductByUuid(i);
    if (result) productsList.push(result);
  });

  const [listArrItems, setListArrItems] = useState(productsList);
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
          underlayColor={color.primary}
          style={{ marginLeft: 20, marginRight: 10 }}
          onPress={() => returnToHome()}
        >
          <FontAwesome name="angle-left" size={35} color={color.white} />
        </TouchableHighlight>
      ),
      name: <Title color={color.white}>{list?.name}</Title>,
      right: (
        <Styled.Container>
          <CircleProgress
            activeStrokeColor={color.circularHeaderFilled}
            titleColor={color.circularHeaderText}
            circleBackgroundColor={color.circularHeaderBackground}
            filled={amount}
            progress={un && amount ? amount : 0}
            total={un}
            size={24}
          />
        </Styled.Container>
      ),
    });
  };

  const filterUpdate = (): void => {
    const productsList: IProduct[] = [];
    list.items.forEach((i: string) => {
      const result = getProductByUuid(i);
      if (result) productsList.push(result);
    });
    setTags(list?.tags ? ["Todos", ...list.tags] : []);
    if (filter === "Todos") {
      setListArrItems(productsList);
      const newTotal: TotalType = {
        un: getTotalQuantityAmountByListUuid(list.uuid, productsList),
        amount: getTotalQuantityWithoutAmountByListUuid(
          list.uuid,
          productsList
        ),
      };
      setTotal(newTotal);
      attHeader(newTotal.amount, newTotal.un);
      return;
    }
    const filteredProductsList = productsList.filter(
      (product) => getTagUuidByTagName(filter) === product.tag
    );
    const newTotal: TotalType = {
      un: getTotalQuantityAmountByListUuid(list.uuid, productsList),
      amount: getTotalQuantityWithoutAmountByListUuid(list.uuid, productsList),
    };
    setTotal(newTotal);
    setListArrItems(filteredProductsList);
    attHeader(newTotal.amount, newTotal.un);
  };

  useEffect(() => {
    filterUpdate();
    return () => {};
  }, [filter, list]);

  return (
    <Container noPadding>
      <Header
        background={color.backgroundPrimary}
        bottom={
          list && list.tags.length > 0 ? (
            <FilterButtons
              getTagByUuid={getTagByUuid}
              color={color}
              tags={tags}
              filter={filter}
              setFilter={setFilter}
            />
          ) : null
        }
      />
      <ContainerInner justify="center" background={color.backgroundPrimary}>
        {list.items.length > 0 ? (
          <ListGrid color={color} list={listArrItems} listId={list.uuid} />
        ) : (
          <EmptyList color={color} mensage={I18n.t("noItemsInTheList")} />
        )}
      </ContainerInner>
    </Container>
  );
}
