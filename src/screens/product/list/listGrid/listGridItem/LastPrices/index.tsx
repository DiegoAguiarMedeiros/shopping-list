import React from "react";
import { FlatList, Dimensions, useColorScheme } from "react-native";
import Button from "../../../../../../components/Button";
import * as Styled from "./styles";
import { TagsIterface } from "../../../../../../types/types";
import ITag from "../../../../../../Domain/Model/ITag";
import getTagByUuidController from "../../../../../../Domain/UseCases/Tag/GetTagByUuid";
import { SubTitle, Text } from "../../../../../../components/Text";
import { useShoppingListContext } from "../../../../../../context/ShoppingList";
import I18n from "i18n-js";

interface LastPricesProps {
  lastPrices: string[];
}

const LastPrices = ({ lastPrices }: LastPricesProps) => {
  const colorScheme = useColorScheme();
  const { getTheme, getCurrency, getColor } = useShoppingListContext();
  const renderButton = (item: any) => {
    return (
      <Styled.ButtonContainer>
        <Styled.ButtonText
          border={getColor().itemProductListLastPriceButtonBorder}
        >
          <Text color={getColor().itemProductListLastPriceButtonText}>
            {getCurrency()} {Number(item.item).toFixed(2).replace(".", ",")}
          </Text>
        </Styled.ButtonText>
      </Styled.ButtonContainer>
    );
  };

  return (
    <Styled.Container>
      <Text color={getColor().textSecondary}>{I18n.t("latestPrices")}</Text>
      <FlatList
        horizontal
        data={lastPrices}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderButton}
        showsHorizontalScrollIndicator={false}
      />
    </Styled.Container>
  );
};

export default LastPrices;
