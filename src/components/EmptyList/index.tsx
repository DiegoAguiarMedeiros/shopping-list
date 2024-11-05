import { useColorScheme } from "react-native";

import * as Styled from "./styles";
import { useState } from "react";
import { BottomSheetProps } from "../../types/types";
import Button from "../Button";
import { Text } from "../Text";
import Container from "../Container";
import ContainerInner from "../ContainerInner";
import { colorTheme } from "../../../constants/Colors";
import { useStores } from "../../context/StoreContext";

interface Image {
  image: any;
}

const img: Image = {
  image: require("../../../assets/images/emptyList.png"),
};

type EmptyListProps = {
  mensage?: string;
};

export default function EmptyList({
  mensage,
}: Readonly<EmptyListProps>) {
  const { ConfigRepository } = useStores();
  return (
    <Container background={ConfigRepository.color.backgroundPrimary}>
      <ContainerInner justify="center" background={ConfigRepository.color.backgroundPrimary}>
        <Styled.SlideContainerInnerImage>
          <Styled.SlideImage source={img.image} />
        </Styled.SlideContainerInnerImage>
        <Styled.ListEmptyTextmessage text={ConfigRepository.color.backgroundPrimary}>
          <Text color={ConfigRepository.color.theme === "light" ? ConfigRepository.color.black : ConfigRepository.color.white}>
            {mensage}
          </Text>
        </Styled.ListEmptyTextmessage>
      </ContainerInner>
    </Container>
  );
}

