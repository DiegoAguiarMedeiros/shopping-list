import { useColorScheme, Animated } from "react-native";
import * as Styled from "./styles";
import { useEffect, useRef } from "react";

import { FontAwesome } from "@expo/vector-icons";

import { SubTitle, Text, Title2 } from "../../../../../components/Text";
import { useShoppingListContext } from "../../../../../context/ShoppingList";

import { BottomSheetProps } from "../../../../../components/BottomSheet";
import NewProductForm from "../../../../../components/NewProductForm";
import { IProduct } from "../../../../../Model/IProduct";
import AveragePrice from "./AveragePrice";
import LastPrices from "./LastPrices";
import GridItem from "../../../../../components/GridItem";
import {
  GridItemInner,
  GridItemWrapperCol,
  GridItemWrapperInner,
  GridItemWrapperRow,
} from "../../../../../components/GridItemInner";
import I18n from "i18n-js";
import { colorTheme } from "../../../../../../constants/Colors";

interface ItemProps {
  item: IProduct;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  color: colorTheme;
  productRef: React.MutableRefObject<{
    handleAddProduct: (product: IProduct) => void;
  } | null>;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export default function ListGridItem({
  item,
  setBottomSheetProps,
  handleCloseBottomSheet,
  color,
  productRef,
  setProducts,
}: Readonly<ItemProps>) {
  const { handleDeleteProduct, getLastPrices } = useShoppingListContext();

  const colorScheme = useColorScheme();
  const lastPrice = getLastPrices(item.uuid);
  const gridItemRef = useRef<any>();
  const handleCloseSwipeableFromParent = () => {
    // Access the handleCloseSwipeable function from the ref
    if (gridItemRef.current) {
      gridItemRef.current.handleCloseSwipeable();
    }
  };

  useEffect(() => {
    handleCloseSwipeableFromParent();
  }, [item.name]);
  const handleEdit = () => {
    setBottomSheetProps({
      height: "edit",
      children: (
        <NewProductForm
          color={color}
          action="editList"
          buttonText="edit"
          items={item}
          onClose={handleCloseBottomSheet}
          productListRef={productRef}
        />
      ),
      isVisible: true,
      color: color,
    });
  };

  const handleDelete = () => {
    handleDeleteProduct(item.uuid);
    setProducts((prev) => prev.filter((p) => p.uuid !== item.uuid));
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
            <GridItemWrapperCol width={50}>
              <Styled.ButtonInner
                underlayColor={color.swipeIconUnderlay}
                onPress={handleEdit}
              >
                <>
                  <GridItemWrapperInner height={lastPrice.length > 0 ? 50 : 60}>
                    <Styled.ButtonTextIcon text={color.swipeIcon}>
                      <FontAwesome
                        size={lastPrice.length > 0 ? 26 : 18}
                        style={{ marginBottom: -3 }}
                        name="pencil"
                      />
                    </Styled.ButtonTextIcon>
                  </GridItemWrapperInner>

                  <GridItemWrapperInner
                    height={lastPrice.length > 0 ? 50 : 40}
                    justify={lastPrice.length > 0 ? "flex-start" : "flex-end"}
                  >
                    {lastPrice.length > 0 ? (
                      <SubTitle color={color.swipeIcon} align="center">
                        {I18n.t("edit")}
                      </SubTitle>
                    ) : (
                      <Text color={color.swipeIcon} align="center">
                        {I18n.t("edit")}
                      </Text>
                    )}
                  </GridItemWrapperInner>
                </>
              </Styled.ButtonInner>
            </GridItemWrapperCol>

            <GridItemWrapperCol width={50}>
              <Styled.ButtonInner
                underlayColor={color.swipeIconUnderlay}
                onPress={handleDelete}
              >
                <>
                  <GridItemWrapperInner height={lastPrice.length > 0 ? 50 : 60}>
                    <Styled.ButtonTextIcon text={color.swipeIcon}>
                      <FontAwesome
                        size={lastPrice.length > 0 ? 26 : 18}
                        style={{ marginBottom: -3 }}
                        name="trash"
                      />
                    </Styled.ButtonTextIcon>
                  </GridItemWrapperInner>
                  <GridItemWrapperInner
                    height={lastPrice.length > 0 ? 50 : 40}
                    justify={lastPrice.length > 0 ? "flex-start" : "flex-end"}
                  >
                    {lastPrice.length > 0 ? (
                      <SubTitle color={color.swipeIcon} align="center">
                        {I18n.t("delete")}
                      </SubTitle>
                    ) : (
                      <Text color={color.swipeIcon} align="center">
                        {I18n.t("delete")}
                      </Text>
                    )}
                  </GridItemWrapperInner>
                </>
              </Styled.ButtonInner>
            </GridItemWrapperCol>
          </>
        </GridItemInner>
      </Animated.View>
    );
  };
  return (
    <GridItem
      renderRightActions={LeftSwipe}
      leftThreshold={100}
      rightThreshold={undefined}
      ref={gridItemRef}
    >
      <GridItemInner
        underlayColor={color.itemListBackgroundUnderlay}
        borderColor={color.itemListBackgroundBorder}
        background={color.itemListBackground}
        height={lastPrice.length > 0 ? 115 : 60}
        row={false}
        elevation={colorScheme === "light"}
      >
        <>
          <GridItemWrapperRow height={lastPrice.length > 0 ? 35 : 100}>
            <GridItemWrapperInner height={100}>
              <Title2 color={color.text}>{item.name}</Title2>
            </GridItemWrapperInner>
          </GridItemWrapperRow>
          <GridItemWrapperRow height={lastPrice.length > 0 ? 67 : 0}>
            {lastPrice.length > 0 ? (
              <GridItemWrapperInner
                width={70}
                height={100}
                justify="flex-start"
              >
                <LastPrices color={color} lastPrices={lastPrice} />
              </GridItemWrapperInner>
            ) : (
              <></>
            )}
            {lastPrice.length > 0 ? (
              <GridItemWrapperInner
                width={30}
                height={100}
                justify="flex-start"
              >
                <AveragePrice color={color} price={lastPrice} />
              </GridItemWrapperInner>
            ) : (
              <></>
            )}
          </GridItemWrapperRow>
        </>
      </GridItemInner>
    </GridItem>
  );
}
