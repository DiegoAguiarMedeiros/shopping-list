import React from "react";
import { FlatList, Dimensions, useColorScheme } from "react-native";
import Button from "../../../../../../components/Button";
import Colors from "../../../../../../constants/Colors";
import * as Styled from "./styles";
import { TagsIterface } from "../../../../../../types/types";
import ITag from "../../../../../../Domain/Model/ITag";
import getTagByUuidController from "../../../../../../Domain/UseCases/Tag/GetTagByUuid";
import { SubTitle, Text } from "../../../../../../components/Text";

interface LastPricesProps {
  lastPrices: string[];
}

const LastPrices = ({ lastPrices }: LastPricesProps) => {
  const colorScheme = useColorScheme();
  const renderButton = (item: any) => {

    return (
      <Styled.ButtonContainer>
        <Styled.ButtonText border={Colors[colorScheme ?? "light"].primary}>
          <Text color={
            colorScheme !== "dark"
              ? Colors[colorScheme ?? "light"].black
              : Colors[colorScheme ?? "light"].white
          }>{item.item}</Text>
        </Styled.ButtonText>
      </Styled.ButtonContainer>
    );
  };

  return (
    <Styled.Container>
      <SubTitle
        color={
          colorScheme !== "dark"
            ? Colors[colorScheme ?? "light"].black
            : Colors[colorScheme ?? "light"].white
        }
      >
        Últimos Preços
      </SubTitle>
      <FlatList
        horizontal
        data={lastPrices}
        keyExtractor={(index) => String(index)}
        renderItem={renderButton}
        showsHorizontalScrollIndicator={false}
      />
    </Styled.Container>
  );
};

export default LastPrices;
