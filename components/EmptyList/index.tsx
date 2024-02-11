import { useColorScheme } from "react-native";

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
  const { getTheme, getColor } = useShoppingListContext();
  return (
    <Container background={getColor().backgroundPrimary}>
      <ContainerInner
        justify="center"
        background={getColor().backgroundPrimary}
      >
        <Styled.SlideContainerInnerImage>
          <Styled.SlideImage source={img.image} />
        </Styled.SlideContainerInnerImage>
        <Styled.ListEmptyTextmessage text={getColor().backgroundPrimary}>
          <Text
            color={getTheme() !== "dark" ? getColor().black : getColor().white}
          >
            {mensage}
          </Text>
        </Styled.ListEmptyTextmessage>
      </ContainerInner>
    </Container>
  );
}
