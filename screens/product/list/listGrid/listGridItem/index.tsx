import { useColorScheme, Animated } from "react-native";
import Colors from "../../../../../constants/Colors";
import * as Styled from "./styles";
import { useCallback } from "react";

import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Title, SubTitle } from "../../../../../components/Text";
import {
  useShoppingListArchivedContext,
  useShoppingListContext,
} from "../../../../../context/ShoppingList";

import { BottomSheetProps } from "../../../../../components/BottomSheet";
import DeleteProductByUuid from "../../../../../Domain/UseCases/ListProduct/DeleteProductByUuid";
import GetTagByUuid from "../../../../../Domain/UseCases/Tag/GetTagByUuid";
import NewProductForm from "../../../../../components/NewProductForm";
import { IProduct } from "../../../../../Domain/Model/IProduct";
import AveragePrice from "./AveragePrice";
import LastPrices from "./LastPrices";
import GridItem from "../../../../../components/GridItem";
import { GridItemInner, GridItemWrapper, GridItemWrapperInner } from "../../../../../components/GridItemInner";


interface ItemProps {
  item: IProduct;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
}

export default function ListGridItem({
  item,
  setBottomSheetProps,
  handleCloseBottomSheet,
}: Readonly<ItemProps>) {
  const {
    listProduct,
    setListProduct
  } = useShoppingListContext();

  const colorScheme = useColorScheme();
  const router = useRouter();
  const tag = GetTagByUuid.handle(item.tag);

  const handleEdit = () => {
    setBottomSheetProps({
      // listId: item.uuid,
      // items: item,
      // buttonText: "edit",
      // action: "editList",
      height: "edit",
      children: (
        <NewProductForm
          action="editList"
          buttonText="edit"
          items={item}
          onClose={handleCloseBottomSheet}
        />
      ),
      isVisible: true,
    });
  };

  const handleDelete = () => {
    const updatedList: IProduct[] = JSON.parse(JSON.stringify(listProduct));
    const newupdatedList = updatedList.filter(i => item.uuid !== i.uuid)
    DeleteProductByUuid.handle(item.uuid);
    setListProduct(newupdatedList);
  };

  const LeftSwipe = (
    progress: any,
    dragX: {
      interpolate: (arg0: {
        inputRange: number[];
        outputRange: number[];
      }) => any;
    }
  ) => {
    return (
      <Animated.View
        style={{
          width: 200,
          overflow: "hidden",
        }}
      >
        <GridItemInner>
          <>
            <GridItemWrapper width={50} >
              <Styled.ButtonInner
                underlayColor={
                  Colors[colorScheme ?? "light"]
                    .swipeablebuttonTouchableHighlightBackgroundColor
                }
                onPress={handleEdit}
              >
                <>
                  <GridItemWrapperInner height={50}>

                    <Styled.ButtonTextIcon
                      text={Colors[colorScheme ?? "light"].swipeablebuttonTextColor}
                    >
                      <FontAwesome
                        size={26}
                        style={{ marginBottom: -3 }}
                        name="pencil"
                      />
                    </Styled.ButtonTextIcon>
                  </GridItemWrapperInner>

                  <GridItemWrapperInner height={50} justify="flex-start">
                    <SubTitle
                      color={Colors[colorScheme ?? "light"].swipeablebuttonTextColor}
                      align="center"
                    >
                      Editar
                    </SubTitle>
                  </GridItemWrapperInner>
                </>
              </Styled.ButtonInner>
            </GridItemWrapper>

            <GridItemWrapper width={50} >
              <Styled.ButtonInner
                underlayColor={
                  Colors[colorScheme ?? "light"]
                    .swipeablebuttonTouchableHighlightBackgroundColor
                }
                onPress={handleDelete}
              >
                <>
                  <Styled.ButtonTextIcon
                    text={Colors[colorScheme ?? "light"].swipeablebuttonTextColor}
                  >
                    <FontAwesome
                      size={26}
                      style={{ marginBottom: -3 }}
                      name="trash"
                    />
                  </Styled.ButtonTextIcon>
                  <GridItemWrapperInner height={50} justify="flex-start">
                    <SubTitle
                      color={Colors[colorScheme ?? "light"].swipeablebuttonTextColor}
                      align="center"
                    >
                      Deletar
                    </SubTitle>
                  </GridItemWrapperInner>
                </>
              </Styled.ButtonInner>
            </GridItemWrapper>
          </>
        </GridItemInner>
      </Animated.View >
    );
  };
  item.amount = ["2.99", "3.99", "4.99"]
  return (
    <GridItem
      renderRightActions={LeftSwipe}
      leftThreshold={100} rightThreshold={undefined}>
      <GridItemInner
        underlayColor={Colors[colorScheme ?? "light"].listItemBackgroundColor}
        borderColor={
          Colors[colorScheme ?? "light"].listItemBackgroundBorderColor
        }
        background={Colors[colorScheme ?? "light"].listItemBackgroundColor}
        height={110}
      >
        <>
          <GridItemWrapper width={70} >
            <GridItemWrapperInner height={30}>
              <Title
                color={
                  colorScheme !== "dark"
                    ? Colors[colorScheme ?? "light"].black
                    : Colors[colorScheme ?? "light"].white
                }
              >
                {item.name}
              </Title>


            </GridItemWrapperInner>
            <GridItemWrapperInner height={70}>

              <LastPrices tags={item.amount} />

            </GridItemWrapperInner>
          </GridItemWrapper>
          <GridItemWrapper width={30} >
            <GridItemWrapperInner height={30}>

              <SubTitle
                color={
                  colorScheme !== "dark"
                    ? Colors[colorScheme ?? "light"].black
                    : Colors[colorScheme ?? "light"].white
                }
              >
                {tag?.name}
              </SubTitle>
            </GridItemWrapperInner>
            <GridItemWrapperInner height={70}>

              <AveragePrice
                price={item.amount.map((a) => (Number(a)))}
              />
            </GridItemWrapperInner>
          </GridItemWrapper>

        </>
      </GridItemInner>
    </GridItem >
  );
}
