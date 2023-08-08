import { useColorScheme } from "react-native";
import Colors from "../../../constants/Colors";
import * as Styled from "./styles";
import { useState } from "react";
import { BottomSheetProps } from "../../../types/types";
import Button from "../../../components/Button";
import BottomSheetComponent from "../../../components/BottomSheetComponent";

interface Image {
  image: any;
}

const img: Image = {
  image: require("../../../assets/images/emptyList.png"),
};

export default function EmptyList() {
  const colorScheme = useColorScheme();
  const [bottomSheetProps, setBottomSheetProps] = useState<BottomSheetProps>({
    action: "addList",
    listId: "",
    buttonText: "add",
    isVisible: false,
    onClose: (item: BottomSheetProps) => setBottomSheetProps(item),
  });
  return (
    <Styled.Container background={Colors[colorScheme ?? "light"].bodyBackgroundColor}>
      <Styled.ContainerListEmpty>
        <Styled.ContainerListEmptyInner>
          <Styled.SlideContainerInnerImage>
            <Styled.SlideImage source={img.image} />
          </Styled.SlideContainerInnerImage>
          <Styled.ListEmptyTextmessage
            text={Colors[colorScheme ?? "light"].bodyTextColor}
          >
            Você não tem nenhuma lista criada
          </Styled.ListEmptyTextmessage>
        </Styled.ContainerListEmptyInner>
        <Styled.ContainerListEmptyInnerButton>
          <Styled.ContainerButtonAdd>
            <Button
              text="Adicionar"
              background={Colors[colorScheme ?? "light"].buttonActiveBackgroundColor}
              icon="plus"
              onPress={() =>
                setBottomSheetProps({ ...bottomSheetProps, isVisible: true })
              }
            />
          </Styled.ContainerButtonAdd>
        </Styled.ContainerListEmptyInnerButton>
      </Styled.ContainerListEmpty>
      <BottomSheetComponent {...bottomSheetProps} />
    </Styled.Container>
  );
}
