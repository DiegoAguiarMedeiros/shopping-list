import { useColorScheme, Animated } from "react-native";
import * as Styled from "./styles";

import { FontAwesome } from "@expo/vector-icons";

import { SubTitle, Text, Title2 } from "../../../../../components/Text";

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
import { useStores } from "../../../../../context/StoreContext";
import React from "react";
import isEqual from "lodash.isequal";

interface ItemProps {
  item: IProduct;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
}

const ListGridItem = React.memo(
  ({
    item,
    setBottomSheetProps,
    handleCloseBottomSheet,
  }: Readonly<ItemProps>) => {
    const { ProductRepository, TagRepository, ConfigRepository } = useStores();
    const colorScheme = useColorScheme();
    const lastPrice = item.lastPrices ?? [];
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
      ProductRepository.removeItem(item.uuid);
      TagRepository.decreaseProductQTD(item.tag);
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
                  underlayColor={ConfigRepository.color.swipeIconUnderlay}
                  onPress={handleEdit}
                >
                  <Styled.ButtonContent>
                    <GridItemWrapperInner height={lastPrice.length > 0 ? 50 : 60}>
                      <Styled.ButtonTextIcon text={ConfigRepository.color.swipeIcon}>
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
                        <SubTitle color={ConfigRepository.color.swipeIcon} align="center">
                          {I18n.t("edit")}
                        </SubTitle>
                      ) : (
                        <Text color={ConfigRepository.color.swipeIcon} align="center">
                          {I18n.t("edit")}
                        </Text>
                      )}
                    </GridItemWrapperInner>
                  </Styled.ButtonContent>
                </Styled.ButtonInner>
              </GridItemWrapperCol>

              <GridItemWrapperCol width={50}>
                <Styled.ButtonInner
                  underlayColor={ConfigRepository.color.swipeIconUnderlay}
                  onPress={handleDelete}
                >
                  <Styled.ButtonContent>
                    <GridItemWrapperInner height={lastPrice.length > 0 ? 50 : 60}>
                      <Styled.ButtonTextIcon text={ConfigRepository.color.swipeIcon}>
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
                        <SubTitle color={ConfigRepository.color.swipeIcon} align="center">
                          {I18n.t("delete")}
                        </SubTitle>
                      ) : (
                        <Text color={ConfigRepository.color.swipeIcon} align="center">
                          {I18n.t("delete")}
                        </Text>
                      )}
                    </GridItemWrapperInner>
                  </Styled.ButtonContent>
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
      >
        <GridItemInner
          underlayColor={ConfigRepository.color.itemListBackgroundUnderlay}
          borderColor="transparent"
          background={ConfigRepository.color.itemListBackground}
          height={lastPrice.length > 0 ? 115 : 60}
          row={false}
          elevation={colorScheme === "light"}
        >
          <>
            <GridItemWrapperRow height={lastPrice.length > 0 ? 35 : 100}>
              <GridItemWrapperInner height={100}>
                <SubTitle color={ConfigRepository.color.text}>{item.name}</SubTitle>
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={lastPrice.length > 0 ? 67 : 0}>
              {lastPrice.length > 0 ? (
                <GridItemWrapperInner
                  width={70}
                  height={100}
                  justify="flex-start"
                >
                  <LastPrices lastPrices={lastPrice} />
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
                  <AveragePrice price={lastPrice} />
                </GridItemWrapperInner>
              ) : (
                <></>
              )}
            </GridItemWrapperRow>
          </>
        </GridItemInner>
      </GridItem>
    );
  },
  (prevProps, nextProps) => {
    return isEqual(prevProps.item, nextProps.item);
  }
);

export default ListGridItem;
