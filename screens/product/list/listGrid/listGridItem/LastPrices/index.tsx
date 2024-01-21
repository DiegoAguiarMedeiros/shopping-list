import React from "react";
import { FlatList, Dimensions, useColorScheme } from "react-native";
import Button from "../../../../../../components/Button";
import Colors from "../../../../../../constants/Colors";
import * as Styled from "./styles";
import { TagsIterface } from "../../../../../../types/types";
import ITag from "../../../../../../Domain/Model/ITag";
import getTagByUuidController from "../../../../../../Domain/UseCases/Tag/GetTagByUuid";
import { SubTitle, Text } from "../../../../../../components/Text";
import { useShoppingListContext } from "../../../../../../context/ShoppingList";

interface LastPricesProps {
  lastPrices: string[];
}

const LastPrices = ({ lastPrices }: LastPricesProps) => {
  const colorScheme = useColorScheme();
  const { getTheme } = useShoppingListContext();
  const renderButton = (item: any) => {
    return (
      <Styled.ButtonContainer>
        <Styled.ButtonText
          border={Colors[getTheme()].itemProductListLastPriceButtonBorder}
        >
          <Text color={Colors[getTheme()].itemProductListLastPriceButtonText}>
            R$ {Number(item.item).toFixed(2).replace(".", ",")}
          </Text>
        </Styled.ButtonText>
      </Styled.ButtonContainer>
    );
  };

  return (
    <Styled.Container>
      <Text color={Colors[getTheme()].textSecondary}>Últimos Preços</Text>
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
