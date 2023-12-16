import React from "react";
import { FlatList, Dimensions, useColorScheme } from "react-native";
import Button from "../../../../../../components/Button";
import Colors from "../../../../../../constants/Colors";
import * as Styled from "./styles";
import { TagsIterface } from "../../../../../../types/types";
import ITag from "../../../../../../Domain/Model/ITag";
import getTagByUuidController from "../../../../../../Domain/UseCases/Tag/GetTagByUuid";
import { SubTitle } from "../../../../../../components/Text";

interface LastPricesProps {
  tags: string[];
}

const LastPrices = ({ tags }: LastPricesProps) => {
  const colorScheme = useColorScheme();
  const renderButton = (item: any) => {

    return (
      <Styled.ButtonContainer>
        <Button
          border={Colors[colorScheme ?? "light"].buttonActiveBackgroundColor}
          background={Colors[colorScheme ?? "light"].listItemBackgroundColor}
          text={item.item}
        />
      </Styled.ButtonContainer>
    );
  };

  return (
    <>
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
        data={tags}
        keyExtractor={(tag) => tag}
        renderItem={renderButton}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default LastPrices;
