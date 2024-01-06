import { useColorScheme, Animated } from "react-native";
import Colors from "../../../../../constants/Colors";
import * as Styled from "./styles";
import { useCallback } from "react";

import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Title, SubTitle, Text, Title2 } from "../../../../../components/Text";
import {
  useShoppingListContext,
} from "../../../../../context/ShoppingList";

import { BottomSheetProps } from "../../../../../components/BottomSheet";
import DeleteProductByUuid from "../../../../../Domain/UseCases/ListProduct/DeleteProductByUuid";
import GetTagByUuid from "../../../../../Domain/UseCases/Tag/GetTagByUuid";
import NewProductForm from "../../../../../components/NewProductForm";
import { ILastPrices, IProduct } from "../../../../../Domain/Model/IProduct";
import AveragePrice from "./AveragePrice";
import LastPrices from "./LastPrices";
import GridItem from "../../../../../components/GridItem";
import { GridItemInner, GridItemWrapperCol, GridItemWrapperInner, GridItemWrapperRow } from "../../../../../components/GridItemInner";


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
    handleDeleteProduct
  } = useShoppingListContext();

  const colorScheme = useColorScheme();
  const router = useRouter();
  const tag = GetTagByUuid.handle(item.tag);
  const lastPrice = item.lastPrices ? Object.values(item.lastPrices) : [];
  const handleEdit = () => {
    setBottomSheetProps({
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
    handleDeleteProduct(item.uuid);
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
        <GridItemInner row>
          <>
            <GridItemWrapperCol width={50} >
              <Styled.ButtonInner
                underlayColor={
                  Colors[colorScheme ?? "light"]
                    .swipeIcon
                }
                onPress={handleEdit}
              >
                <>
                  <GridItemWrapperInner height={lastPrice.length > 0 ? 50 : 60}>

                    <Styled.ButtonTextIcon
                      text={Colors[colorScheme ?? "light"].swipeIcon}
                    >
                      <FontAwesome
                        size={lastPrice.length > 0 ? 26 : 18}
                        style={{ marginBottom: -3 }}
                        name="pencil"
                      />
                    </Styled.ButtonTextIcon>
                  </GridItemWrapperInner>

                  <GridItemWrapperInner height={lastPrice.length > 0 ? 50 : 40} justify={lastPrice.length > 0 ? "flex-start" : "flex-end"}>
                    {lastPrice.length > 0 ? <SubTitle
                      color={Colors[colorScheme ?? "light"].swipeIcon}
                      align="center"
                    >
                      Editar
                    </SubTitle> :
                      <Text
                        color={Colors[colorScheme ?? "light"].swipeIcon}
                        align="center"
                      >
                        Editar
                      </Text>
                    }
                  </GridItemWrapperInner>
                </>
              </Styled.ButtonInner>
            </GridItemWrapperCol>

            <GridItemWrapperCol width={50} >
              <Styled.ButtonInner
                underlayColor={
                  Colors[colorScheme ?? "light"]
                    .swipeIcon
                }
                onPress={handleDelete}
              >
                <>
                  <GridItemWrapperInner height={lastPrice.length > 0 ? 50 : 60} >
                    <Styled.ButtonTextIcon
                      text={Colors[colorScheme ?? "light"].swipeIcon}
                    >
                      <FontAwesome
                        size={lastPrice.length > 0 ? 26 : 18}
                        style={{ marginBottom: -3 }}
                        name="trash"
                      />
                    </Styled.ButtonTextIcon>
                  </GridItemWrapperInner>
                  <GridItemWrapperInner height={lastPrice.length > 0 ? 50 : 40} justify={lastPrice.length > 0 ? "flex-start" : "flex-end"}>
                    {lastPrice.length > 0 ? <SubTitle
                      color={Colors[colorScheme ?? "light"].swipeIcon}
                      align="center"
                    >
                      Deletar
                    </SubTitle> :
                      <Text
                        color={Colors[colorScheme ?? "light"].swipeIcon}
                        align="center"
                      >
                        Deletar
                      </Text>
                    }
                  </GridItemWrapperInner>
                </>
              </Styled.ButtonInner>
            </GridItemWrapperCol>
          </>
        </GridItemInner>
      </Animated.View >
    );
  };
  return (
    <GridItem
      renderRightActions={LeftSwipe}
      leftThreshold={100} rightThreshold={undefined}>
      <GridItemInner
        underlayColor={Colors[colorScheme ?? "light"].backgroundSecondary}
        borderColor={
          Colors[colorScheme ?? "light"].backgroundSecondary
        }
        background={Colors[colorScheme ?? "light"].backgroundSecondary}
        height={lastPrice.length > 0 ? 100 : 60}
        row={false}
      >
        <>
          <GridItemWrapperRow height={lastPrice.length > 0 ? 30 : 100} >
            <GridItemWrapperInner height={100}>
              <Title2
                color={Colors[colorScheme ?? "light"].text}
              >
                {item.name}
              </Title2>


            </GridItemWrapperInner>
          </GridItemWrapperRow>
          <GridItemWrapperRow height={lastPrice.length > 0 ? 60 : 0} >
            {lastPrice.length > 0 ? <GridItemWrapperInner width={70} height={100}>

              <LastPrices lastPrices={lastPrice.map(price => ((price.price.toFixed(2))))} />

            </GridItemWrapperInner> : <></>}
            {lastPrice.length > 0 ? <GridItemWrapperInner width={30} height={100}>

              <AveragePrice
                price={lastPrice}
              />
            </GridItemWrapperInner> : <></>}
          </GridItemWrapperRow>

        </>
      </GridItemInner>
    </GridItem >
  );
}
