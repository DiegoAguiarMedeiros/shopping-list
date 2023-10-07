import { useShoppingListContext } from "../../context/ShoppingList";
import { KeyboardAvoidingView, useColorScheme } from "react-native";
import EmptyList from "../../components/EmptyList";
import ListComponent from "./list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import BottomSheet, { BottomSheetProps } from "../../components/BottomSheet";
import { useState } from "react";
import NewListForm from "../../components/NewListForm";
import Button from "../../components/Button";
export default function Home() {
  const colorScheme = useColorScheme();
  const { list, listItem, itemAmountList } = useShoppingListContext();
  const entries = list ? Object.values(list) : [];
  const isFocused = useIsFocused();
  const handleCloseBottomSheet = () => {
    setBottomSheetProps({ ...bottomSheetProps, isVisible: false });
  };

  const [bottomSheetProps, setBottomSheetProps] = useState<BottomSheetProps>({
    children: (
      <NewListForm
        action="addList"
        buttonText="add"
        onClose={handleCloseBottomSheet}
      />
    ),
    height: "add",
    isVisible: false,
  });
  // console.log("list", list);
  // console.log("listItem", listItem);
  // console.log("itemAmountList", itemAmountList);
  // AsyncStorage.clear();
  return (
    <Styled.Container
      background={Colors[colorScheme ?? "light"].bodyBackgroundColor}
    >
      <Styled.ContainerListInner>
        {isFocused &&
          (entries && entries.length > 0 ? (
            <ListComponent
              items={entries}
              setBottomSheetProps={setBottomSheetProps}
              handleCloseBottomSheet={handleCloseBottomSheet}
            />
          ) : (
            <EmptyList mensage="Você não tem nenhuma lista criada" />
          ))}
      </Styled.ContainerListInner>
      <Styled.ContainerListInnerButton>
        <Styled.ContainerButtonAdd>
          <Button
            text="Adicionar"
            onPress={() =>
              setBottomSheetProps({ ...bottomSheetProps, isVisible: true })
            }
            background={
              Colors[colorScheme ?? "light"].buttonActiveBackgroundColor
            }
            icon="plus"
          />
        </Styled.ContainerButtonAdd>
      </Styled.ContainerListInnerButton>
      <BottomSheet {...bottomSheetProps} />
    </Styled.Container>
  );
}
