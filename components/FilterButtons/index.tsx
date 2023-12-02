import React from "react";
import { FlatList, Dimensions, useColorScheme } from "react-native";
import Button from "../Button";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import { TagsIterface } from "../../types/types";
import ITag from "../../Domain/Model/ITag";
import getTagByUuidController from "../../Domain/UseCases/Tag/GetTagByUuid";

interface FilterButtonsProps {
  tags: string[];
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const FilterButtons = ({ tags, filter, setFilter }: FilterButtonsProps) => {
  const colorScheme = useColorScheme();
  const renderButton = (item: any) => {
    let tag;
    if (item.item !== "Todos") {
      tag = getTagByUuidController.handle(item.item);
    } else {
      tag = { name: item.item };
    }

    const handlePress = () => {
      if (item.item !== "Todos") {
        const tag = getTagByUuidController.handle(item.item);
        setFilter(tag.name);
      } else {
        setFilter(item.item);
      }

    };
    return (
      <Styled.ButtonContainer>
        <Button
          onPress={handlePress}
          background={
            filter === tag.name
              ? Colors[colorScheme ?? "light"].buttonActiveBackgroundColor
              : Colors[colorScheme ?? "light"].buttonBackgroundColor
          }
          text={tag.name}
        />
      </Styled.ButtonContainer>
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
