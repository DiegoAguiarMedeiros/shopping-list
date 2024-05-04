import React from "react";
import { FlatList } from "react-native";
import * as Styled from "./styles";
import { Text } from "../../../../../../components/Text";
import { useShoppingListContext } from "../../../../../../context/ShoppingList";
import I18n from "i18n-js";
import { colorTheme } from "../../../../../../../constants/Colors";

interface LastPricesProps {
  lastPrices: string[];
  color: colorTheme;
}

const LastPrices = ({ lastPrices, color }: LastPricesProps) => {
  const { getCurrency } = useShoppingListContext();
  const renderButton = (item: any) => {
    return (
      <Styled.ButtonContainer>
        <Styled.ButtonText border={color.itemProductListLastPriceButtonBorder}>
          <Text color={color.itemProductListLastPriceButtonText}>
            {getCurrency()} {Number(item.item).toFixed(2).replace(".", ",")}
          </Text>
        </Styled.ButtonText>
      </Styled.ButtonContainer>
    );
  };

  return (
    <Styled.Container>
      <Text color={color.textSecondary}>{I18n.t("latestPrices")}</Text>
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
