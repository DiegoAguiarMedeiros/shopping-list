import { useColorScheme } from "react-native";

import * as Styled from "./styles";
import { useState } from "react";
import { BottomSheetProps } from "../../types/types";
import Button from "../Button";
import { Text } from "../Text";
import Container from "../Container";
import ContainerInner from "../ContainerInner";
import { useShoppingListContext } from "../../context/ShoppingList";
import { colorTheme } from "../../../constants/Colors";

interface Image {
  image: any;
}

const img: Image = {
  image: require("../../../assets/images/emptyList.png"),
};

type EmptyListProps = {
  mensage?: string;
  color: colorTheme;
};

export default function EmptyList({
  mensage,
  color,
}: Readonly<EmptyListProps>) {
  return (
    <Container background={color.backgroundPrimary}>
      <ContainerInner justify="center" background={color.backgroundPrimary}>
        <Styled.SlideContainerInnerImage>
          <Styled.SlideImage source={img.image} />
        </Styled.SlideContainerInnerImage>
        <Styled.ListEmptyTextmessage text={color.backgroundPrimary}>
          <Text color={color.theme === "light" ? color.black : color.white}>
            {mensage}
          </Text>
        </Styled.ListEmptyTextmessage>
      </ContainerInner>
    </Container>
  );
}
