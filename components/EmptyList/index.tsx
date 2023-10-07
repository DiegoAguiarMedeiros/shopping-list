import { useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import { useState } from "react";
import { BottomSheetProps } from "../../types/types";
import Button from "../Button";
import { Text } from "../Text";
import BottomSheetComponent from "../BottomSheetComponent";

interface Image {
  image: any;
}

const img: Image = {
  image: require("../../assets/images/emptyList.png"),
};

type EmptyListProps = {
  action?: "addList" | "editList" | "addListItem" | "editListItem" | "copyList";
  buttonText?: "add" | "edit" | "copy";
  text?: string;
  mensage?: string;
  list?: string;
  showButton?: boolean;
};

export default function EmptyList({
  list,
  action,
  buttonText,
  text,
  mensage,
  showButton,
}: EmptyListProps) {
  const colorScheme = useColorScheme();
  const [bottomSheetProps, setBottomSheetProps] = useState<BottomSheetProps>({
    action: showButton ? action! : "addList",
    listId: list ? list : "",
    buttonText: showButton ? buttonText! : "add",
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
          <Styled.ListEmptyTextmessage
            text={Colors[colorScheme ?? "light"].bodyTextColor}
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
        </Styled.ContainerListEmptyInner>
        <Styled.ContainerListEmptyInnerButton>
          <Styled.ContainerButtonAdd>
            {showButton && (
              <Button
                text={text}
                background={Colors[colorScheme ?? "light"].primary}
                icon="plus"
                onPress={() =>
                  setBottomSheetProps({ ...bottomSheetProps, isVisible: true })
                }
              />
            )}
          </Styled.ContainerButtonAdd>
        </Styled.ContainerListEmptyInnerButton>
      </Styled.ContainerListEmpty>
      <BottomSheetComponent {...bottomSheetProps} />
    </Styled.Container>
  );
}
