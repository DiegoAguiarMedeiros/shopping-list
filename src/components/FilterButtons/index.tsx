import React from "react";
import { FlatList } from "react-native";
import Button from "../Button";

import * as Styled from "./styles";
import { TagsIterface } from "../../types/types";
import { colorTheme } from "../../../constants/Colors";
import ITag from "../../Model/ITag";
import { useStores } from "../../context/StoreContext";
import I18n from "i18n-js";
import isEqual from "lodash.isequal";
import langFilterAll from '../../../constants/LangFilterAll'
import { Title2 } from "../Text";
interface FilterButtonsProps {
  tags: string[];
  filter: string,
}

const FilterButtons = ({
  tags,
  filter
}: FilterButtonsProps) => {
  const { TagRepository, ProductRepository, ConfigRepository } = useStores();
  const renderButton = ({ item }: { item: string }) => {
    const tag =
      item === I18n.t("all")
        ? { name: item }
        : TagRepository.getItem(item);

    if (!tag?.name) {
      return null;
    }

    const handlePress = () => {
      ProductRepository.setTagFilter(tag.name);
    };

    return (
      <Styled.ButtonContainer>
        <Button
          onPress={handlePress}
          border={
            filter === tag.name
              ? ConfigRepository.color.filterButtonActiveBorder
              : ConfigRepository.color.filterButtonBorder
          }
          background={
            filter === tag.name
              ? ConfigRepository.color.filterButtonActiveBackground
              : ConfigRepository.color.filterButtonBackground
          }
          textColor={
            filter === tag.name
              ? ConfigRepository.color.filterButtonActiveText
              : ConfigRepository.color.filterButtonText
          }
          underlayColor={
            ConfigRepository.color.filterButtonActiveBackground
          }
          text={tag.name}
        />
      </Styled.ButtonContainer>
    );
  };

  return (
    <Styled.Container>
      <FlatList
        style={{ width: "100%", height: 35 }}
        horizontal
        data={[I18n.t("all"), ...tags]}
        keyExtractor={(item) => item}
        renderItem={renderButton}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          paddingHorizontal: 5,
        }}
      />
    </Styled.Container>
  );
};


export default FilterButtons;
