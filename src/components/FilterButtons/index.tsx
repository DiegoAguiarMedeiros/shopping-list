import React from "react";
import { FlatList, Dimensions, useColorScheme } from "react-native";
import Button from "../Button";

import * as Styled from "./styles";
import { TagsIterface } from "../../types/types";
import { useShoppingListContext } from "../../context/ShoppingList";
import { colorTheme } from "../../../constants/Colors";
import getTagByUuidController from "../../UseCases/Tag/GetTagByUuid";
import ITag from "../../Model/ITag";

interface FilterButtonsProps {
  tags: string[];
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  color: colorTheme;
  getTagByUuid: (uuid: string) => ITag;
}

const FilterButtons = ({
  tags,
  filter,
  setFilter,
  color,
  getTagByUuid,
}: FilterButtonsProps) => {
  const renderButton = (item: any) => {
    let tag: any;
    if (item.item !== "Todos") {
      tag = getTagByUuid(item.item);
    } else {
      tag = { name: item.item };
    }

    const handlePress = () => {
      if (item.item !== "Todos") {
        const tag = getTagByUuid(item.item);
        setFilter(tag?.name);
      } else {
        setFilter(item.item);
      }
    };

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
        data={tags}
        keyExtractor={(tag) => tag}
        renderItem={renderButton}
        showsHorizontalScrollIndicator={false}
      />
    </Styled.Container>
  );
};

export default FilterButtons;
