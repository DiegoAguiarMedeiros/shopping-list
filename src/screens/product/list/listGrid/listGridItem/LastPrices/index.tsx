import React from "react";
import { FlatList } from "react-native";
import * as Styled from "./styles";
import { Text } from "../../../../../../components/Text";
import I18n from "i18n-js";
import { colorTheme } from "../../../../../../../constants/Colors";
import { useStores } from "../../../../../../context/StoreContext";

interface LastPricesProps {
  lastPrices: string[];
}

const LastPrices = ({ lastPrices }: LastPricesProps) => {
  const { ConfigRepository } = useStores();
  const renderButton = (item: any) => {
    return (
      <Styled.ButtonContainer>
        <Styled.ButtonText border={ConfigRepository.color.itemProductListLastPriceButtonBorder}>
          <Text color={ConfigRepository.color.itemProductListLastPriceButtonText}>
            {ConfigRepository.currency} {Number(item.item).toFixed(2).replace(".", ",")}
          </Text>
        </Styled.ButtonText>
      </Styled.ButtonContainer>
    );
  };

  return (
    <Styled.Container>
      <Text color={ConfigRepository.color.textSecondary}>{I18n.t("latestPrices")}</Text>
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
