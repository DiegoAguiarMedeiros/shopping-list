import React from "react";
import { FlatList, Dimensions, useColorScheme } from "react-native";
import Button from "../Button";

import * as Styled from "./styles";
import { TagsIterface } from "../../types/types";
import { useShoppingListContext } from "../../context/ShoppingList";
import { colorTheme } from "../../../constants/Colors";
import getTagByUuidController from "../../UseCases/Tag/GetTagByUuid";
import ITag from "../../Model/ITag";
import { useStores } from "../../context/StoreContext";
import I18n from "i18n-js";
import isEqual from "lodash.isequal";

interface FilterButtonsProps {
  tags: string[];
  color: colorTheme;
  filter: string,
}

const FilterButtons = ({
  tags,
  color, filter
}: FilterButtonsProps) => {
  const { TagRepository, ProductRepository } = useStores();
  const renderButton = (item: any) => {
    let tag: any;
    if (item.item !== I18n.t("all")) {
      tag = TagRepository.getItem(item.item);
    } else {
      tag = { name: item.item };
    }

    const handlePress = () => {

      ProductRepository.setTagFilter(tag.name);
      // if (item.item !== I18n.t("all")) {
      //   const tag = getTagByUuid(item.item);
      //   // tag && setFilter(tag?.name);
      // } else {
      //   // setFilter(item.item);
      // }
    };

    console.log("filter", filter)
    console.log("tag?.name", tag?.name)

    return tag?.name !== "" ? (
      <Styled.ButtonContainer>
        <Button
          onPress={handlePress}
          border={
            filter === tag?.name
              ? color.filterButtonActiveBorder
              : color.filterButtonBorder
          }
          background={
            filter === tag?.name
              ? color.filterButtonActiveBackground
              : color.filterButtonBackground
          }
          textColor={
            filter === tag?.name
              ? color.filterButtonActiveText
              : color.filterButtonText
          }
          underlayColor={color.filterButtonActiveBackground}
          text={tag?.name}
        />
      </Styled.ButtonContainer>
    ) : (
      <></>
    );
  };

  return (
    <Styled.Container>
      <FlatList
        horizontal
        data={[I18n.t("all"), ...tags]}
        keyExtractor={(tag) => tag}
        renderItem={renderButton}
        showsHorizontalScrollIndicator={false}
      />
    </Styled.Container>
  );
};

// export default FilterButtons;

export default FilterButtons;
