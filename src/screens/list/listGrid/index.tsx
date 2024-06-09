import {
  useColorScheme,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import * as Styled from "./styles";
import React, { useEffect, useState } from "react";
import { ItemInterface, TagsIterface, TotalType } from "../../../types/types";
import ListGridItem from "./listGridItem";
import { useShoppingListContext } from "../../../context/ShoppingList";

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
import Total from "./total";
import Header from "../../../components/Header";
import FilterButtons from "../../../components/FilterButtons";
import { useRouter } from "expo-router";
import CircleProgress from "../../../components/CircleProgress";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Title } from "../../../components/Text";
interface ListProps {
  listId: string;
  list: IList;
  color: colorTheme;
  setList: React.Dispatch<React.SetStateAction<IList>>;
  handleCloseBottomSheetList: () => void;
  setActiveRouteHeader: React.Dispatch<
    React.SetStateAction<{
      name: React.ReactNode;
      left: React.ReactNode | null;
      right: React.ReactNode | null;
    }>
  >;
}

function ListGrid({
  list,
  listId,
  color,
  setList,
  handleCloseBottomSheetList,
  setActiveRouteHeader,
}: Readonly<ListProps>) {
  const {
    getTotalQuantityAmountByListUuid,
    getTotalQuantityWithoutAmountByListUuid,
    getProductByUuid,
    getTagUuidByTagName,
    getTotalAmountByListUuid,
    getTagByUuid,
  } = useShoppingListContext();
  const [active, setActive] = useState("");
  const [total, setTotal] = useState<TotalType>({
    total: 0,
    amount: 0,
    un: 0,
  });
  const router = useRouter();
  const [tags, setTags] = useState(list?.tags ? ["Todos", ...list.tags] : []);
  const productsList: IProduct[] = [];
  list.items.forEach((i: string) => {
    const result = getProductByUuid(i);
    if (result) productsList.push(result);
  });

  const [listArrItems, setListArrItems] = useState(productsList);
  const [filter, setFilter] = useState("Todos");

  const handleOpen = (uuid: string) => {
    setActive(uuid);
  };
  const handleClose = () => {
    setActive("");
  };
  const totalUpdate = (total: number, amount: number, un: number): void => {
    const newTotal: TotalType = {
      total,
      un,
      amount,
    };
    setTotal(newTotal);
    attHeader(amount, un);
  };
  const filterUpdate = (): void => {
    const productsList: IProduct[] = [];
    list.items.forEach((i: string) => {
      const result = getProductByUuid(i);
      if (result) productsList.push(result);
    });
    setTags(list?.tags ? ["Todos", ...list.tags] : []);
    totalUpdate(
      getTotalAmountByListUuid(list.uuid, filter),
      getTotalQuantityAmountByListUuid(list.uuid, filter),
      getTotalQuantityWithoutAmountByListUuid(list.uuid, filter)
    );
    if (filter === "Todos") {
      setListArrItems(productsList);
      return;
    }
    const filteredProductsList = productsList.filter(
      (product) => getTagUuidByTagName(filter) === product.tag
    );
    setListArrItems(filteredProductsList);
  };

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

  useEffect(() => {
    filterUpdate();
    return () => {};
  }, [filter, list]);

  return (
    <Container background={"transparent"}>
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
      <ContainerInner>
        <GridItemWrapperRow height={90}>
          <SafeAreaView style={{ flex: 1, width: "100%" }}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ flexGrow: 1 }}
              nestedScrollEnabled
            >
              {listArrItems.map((item) => {
                return (
                  <ListGridItem
                    filter={filter}
                    totalUpdate={totalUpdate}
                    color={color}
                    key={"ListGridItem-" + item.uuid}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    item={item}
                    listId={listId}
                    active={active}
                    setList={setList}
                  />
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </GridItemWrapperRow>
        <Total color={color} total={total.total} un={total.un} />
      </ContainerInner>
    </Container>
  );
}

export default React.memo(ListGrid);
