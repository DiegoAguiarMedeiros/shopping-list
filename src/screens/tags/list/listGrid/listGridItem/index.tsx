import { useColorScheme, Animated } from "react-native";
import * as Styled from "./styles";
import { useCallback, useEffect, useRef } from "react";

import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { SubTitle, Title2 } from "../../../../../components/Text";

import { BottomSheetProps } from "../../../../../components/BottomSheet";
import NewTagForm from "../../../../../components/NewTagForm";
import GridItem from "../../../../../components/GridItem";
import {
  GridItemInner,
  GridItemWrapperCol,
  GridItemWrapperInner,
} from "../../../../../components/GridItemInner";
import NewProductForm from "../../../../../components/NewProductForm";
import I18n from "i18n-js";
import ITag from "../../../../../Model/ITag";
import { colorTheme } from "../../../../../../constants/Colors";
import { IProduct } from "../../../../../Model/IProduct";
import { useStores } from "../../../../../context/StoreContext";

interface ItemProps {
  tag: ITag;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
}

export default function ListGridItem({
  tag,
  setBottomSheetProps,
  handleCloseBottomSheet,
}: Readonly<ItemProps>) {
  const colorScheme = useColorScheme();
  const { TagRepository, ConfigRepository } = useStores();
  const router = useRouter();
  const gridItemRef = useRef<any>();
  const handleCloseSwipeableFromParent = () => {
    // Access the handleCloseSwipeable function from the ref
    if (gridItemRef?.current) {
      gridItemRef?.current.handleCloseSwipeable();
    }
  };

  useEffect(() => {
    handleCloseSwipeableFromParent();
  }, [tag.name]);

  const handleCloseBottomSheetProduct = () => {
    setBottomSheetProps({
      children: (
        <NewProductForm
          action="addList"
          buttonText="add"
          onClose={handleCloseBottomSheetProduct}
          tagUuid={tag.uuid}
        />
      ),
      height: "add",
      isVisible: false,
    });
  };

  const handleOpenList = useCallback(() => {
    setBottomSheetProps({
      isVisible: false,
      height: "add",
      children: (
        <NewProductForm
          onClose={handleCloseBottomSheetProduct}
          action="addList"
          buttonText="add"
          tagUuid={tag.uuid}
        />
      ),
    });
    router.push({ pathname: "/ProductsList", params: { tagUuid: tag.uuid } });
  }, [tag.uuid, router]);

  const handleEdit = () => {
    setBottomSheetProps({
      height: "add",
      children: (
        <NewTagForm
          action="editTag"
          buttonText="edit"
          tag={tag}
          onClose={handleCloseBottomSheet}
        />
      ),
      isVisible: true,
    });
  };

  const handleDelete = () => {
    TagRepository.removeItem(tag.uuid);
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
        <Styled.ButtonView>
          <Styled.ButtonInner
            underlayColor={ConfigRepository.color.swipeIconUnderlay}
            onPress={handleEdit}
          >
            <>
              <Styled.ButtonTextIcon text={ConfigRepository.color.swipeIcon}>
                <FontAwesome
                  size={18}
                  style={{ marginBottom: -3 }}
                  name="pencil"
                />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText text={ConfigRepository.color.swipeIcon}>
                {I18n.t("edit")}
              </Styled.ButtonText>
            </>
          </Styled.ButtonInner>
          <Styled.ButtonInner
            underlayColor={ConfigRepository.color.swipeIconUnderlay}
            onPress={handleDelete}
          >
            <>
              <Styled.ButtonTextIcon text={ConfigRepository.color.swipeIcon}>
                <FontAwesome
                  size={18}
                  style={{ marginBottom: -3 }}
                  name="trash"
                />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText text={ConfigRepository.color.swipeIcon}>
                {I18n.t("delete")}
              </Styled.ButtonText>
            </>
          </Styled.ButtonInner>
        </Styled.ButtonView>
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
        underlayColor={ConfigRepository.color.itemListBackgroundUnderlay}
        borderColor={ConfigRepository.color.itemListBackgroundBorder}
        background={ConfigRepository.color.itemListBackground}
        height={60}
        row
        onPress={handleOpenList}
        elevation={colorScheme === "light"}
      >
        <>
          <GridItemWrapperCol width={70} height={100}>
            <GridItemWrapperInner height={100}>
              <Title2 color={ConfigRepository.color.text}>{tag.name}</Title2>
            </GridItemWrapperInner>
          </GridItemWrapperCol>
          <GridItemWrapperCol width={30} height={100}>
            <GridItemWrapperInner height={100}>
              <SubTitle color={ConfigRepository.color.textSecondary} align="right">
                {I18n.t("products")}: {tag.productsQTD}
              </SubTitle>
            </GridItemWrapperInner>
          </GridItemWrapperCol>
        </>
      </GridItemInner>
    </GridItem>
  );
}
