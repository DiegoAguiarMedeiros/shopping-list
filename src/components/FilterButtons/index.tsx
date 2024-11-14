import React from "react";
import { FlatList, Dimensions, useColorScheme } from "react-native";
import Button from "../Button";

import * as Styled from "./styles";
import { TagsIterface } from "../../types/types";
import { colorTheme } from "../../../constants/Colors";
import getTagByUuidController from "../../UseCases/Tag/GetTagByUuid";
import ITag from "../../Model/ITag";
import { useStores } from "../../context/StoreContext";
import I18n from "i18n-js";
import isEqual from "lodash.isequal";
import langFilterAll from '../../../constants/LangFilterAll'
interface FilterButtonsProps {
  tags: string[];
  filter: string,
}

const FilterButtons = ({
  tags,
  filter
}: FilterButtonsProps) => {

  const { TagRepository, ProductRepository, ConfigRepository } = useStores();
  const renderButton = (item: any) => {
    let tag: any;
    if (item.item !== I18n.t("all")) {
      tag = TagRepository.getItem(item.item);
    } else {
      tag = { name: item.item };
    }

    const handlePress = () => {
      ProductRepository.setTagFilter(tag.name);
    };

    console.log("filter", filter)
    console.log("tag", tag)
    return tag?.name !== "" ? (
      <Styled.ButtonContainer>
        <Button
          onPress={handlePress}
          border={
            filter == tag?.name
              ? ConfigRepository.color.filterButtonActiveBorder
              : ConfigRepository.color.filterButtonBorder
          }
          background={
            filter == tag?.name
              ? ConfigRepository.color.filterButtonActiveBackground
              : ConfigRepository.color.filterButtonBackground
          }
          textColor={
            filter == tag?.name
              ? ConfigRepository.color.filterButtonActiveText
              : ConfigRepository.color.filterButtonText
          }
          underlayColor={ConfigRepository.color.filterButtonActiveBackground}
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
