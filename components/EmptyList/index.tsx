import { useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import { useState } from "react";
import { BottomSheetProps } from "../../types/types";
import Button from "../Button";
import { Text } from "../Text";
import Container from "../Container";
import ContainerInner from "../ContainerInner";

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
  const colorScheme = useColorScheme();
  return (
    <Container
      background={Colors[colorScheme ?? "light"].grayScalePrimary}
    >
      <ContainerInner
        justify="center"
        background={Colors[colorScheme ?? "light"].grayScalePrimary}>

        <Styled.SlideContainerInnerImage>
          <Styled.SlideImage source={img.image} />
        </Styled.SlideContainerInnerImage>
        <Styled.ListEmptyTextmessage
          text={Colors[colorScheme ?? "light"].grayScalePrimary}
        >
          <Text
            color={
              colorScheme !== "dark"
                ? Colors[colorScheme ?? "light"].black
                : Colors[colorScheme ?? "light"].white
            }
          >
            {mensage}
          </Text>
        </Styled.ListEmptyTextmessage>
      </ContainerInner>
    </Container>
  );
}
