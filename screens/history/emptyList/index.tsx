import { useColorScheme } from "react-native";
import Colors from "../../../constants/Colors";
import { Text } from "../../../components/Text";
import * as Styled from "./styles";

interface Image {
  image: any;
}

const img: Image = {
  image: require("../../../assets/images/emptyList.png"),
};

export default function EmptyList() {
  const colorScheme = useColorScheme();

  return (
    <Styled.Container
      background={Colors[colorScheme ?? "light"].bodyBackgroundColor}
    >
      <Styled.ContainerListEmpty>
        <Styled.ContainerListEmptyInner>
          <Styled.SlideContainerInnerImage>
            <Styled.SlideImage source={img.image} />
          </Styled.SlideContainerInnerImage>
          <Styled.ListEmptyTextmessage
            text={Colors[colorScheme ?? "light"].bodyTextColor}
          >
            <Text color={
                    colorScheme !== "dark"
                      ? Colors[colorScheme ?? "light"].black
                      : Colors[colorScheme ?? "light"].white
                  }>
              Você não tem nenhuma lista arquivada
            </Text>
          </Styled.ListEmptyTextmessage>
        </Styled.ContainerListEmptyInner>
      </Styled.ContainerListEmpty>
    </Styled.Container>
  );
}
