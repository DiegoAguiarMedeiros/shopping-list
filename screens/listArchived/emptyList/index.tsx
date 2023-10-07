import { useColorScheme } from "react-native";
import Colors from "../../../constants/Colors";
import * as Styled from "./styles";
import { useState } from "react";
import { BottomSheetProps } from "../../../types/types";
import Button from "../../../components/Button";

interface Image {
  image: any;
}

const img: Image = {
  image: require("../../../assets/images/emptyList.png"),
};

interface ListProps {
  list: string;
}

export default function EmptyList({ list }: ListProps) {
  const colorScheme = useColorScheme();
  const [bottomSheetProps, setBottomSheetProps] = useState<BottomSheetProps>({
    listId: list,
    buttonText: "add",
    action: "addListItem",
    isVisible: false,
    onClose: (item: BottomSheetProps) => setBottomSheetProps(item),
  });

  return (
    <Styled.Container
      background={Colors[colorScheme ?? "light"].bodyBackgroundColor}
    >
      <Styled.ContainerListEmpty>
        <Styled.ContainerListEmptyInner>
          <Styled.SlideContainerInnerImage>
            <Styled.SlideImage source={img.image} />
          </Styled.SlideContainerInnerImage>
        </Styled.ContainerListEmptyInner>
        <Styled.ContainerListEmptyInner>
          <Styled.ListEmptyTextmessage
            text={Colors[colorScheme ?? "light"].bodyTextColor}
          >
            Você não tem nenhuma item na lista
          </Styled.ListEmptyTextmessage>
        </Styled.ContainerListEmptyInner>
      </Styled.ContainerListEmpty>
    </Styled.Container>
  );
}
