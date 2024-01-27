import { useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import { useState } from "react";
import { BottomSheetProps } from "../../types/types";
import Button from "../Button";
import { Text } from "../Text";
import Container from "../Container";
import ContainerInner from "../ContainerInner";
import { useShoppingListContext } from "../../context/ShoppingList";

interface Image {
  image: any;
}

const img: Image = {
  image: require("../../assets/images/emptyList.png"),
};

type EmptyListProps = {
  mensage?: string;
};

export default function EmptyList({ mensage }: EmptyListProps) {
  const { getTheme } = useShoppingListContext();
  return (
    <Container background={Colors[getTheme()].backgroundPrimary}>
      <ContainerInner
        justify="center"
        background={Colors[getTheme()].backgroundPrimary}
      >
        <Styled.SlideContainerInnerImage>
          <Styled.SlideImage source={img.image} />
        </Styled.SlideContainerInnerImage>
        <Styled.ListEmptyTextmessage
          text={Colors[getTheme()].backgroundPrimary}
        >
          <Text
            color={
              getTheme() !== "dark"
                ? Colors[getTheme()].black
                : Colors[getTheme()].white
            }
          >
            {mensage}
          </Text>
        </Styled.ListEmptyTextmessage>
      </ContainerInner>
    </Container>
  );
}
