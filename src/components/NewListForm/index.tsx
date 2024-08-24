import { useColorScheme } from "react-native";
import * as Styled from "./styles";
import InputText from "../InputText";
import Button from "../Button";
import { useEffect, useState } from "react";
import { useShoppingListContext } from "../../context/ShoppingList";
import { Keyboard } from "react-native";
import { IList } from "../../Model/IList";
import I18n from "i18n-js";
import { colorTheme } from "../../../constants/Colors";
import { useStores } from "../../context/StoreContext";
import UUIDGenerator from "react-native-uuid";

export type NewListFormProps = {
  onClose: () => void;
  listId?: string;
  buttonText: "add" | "edit" | "copy";
  action: "addList" | "editList" | "copyList";
  list?: IList;
  color: colorTheme;
  handleCloseSwipeableFromParent?: () => void;
};

const NewListForm = ({
  onClose,
  listId,
  buttonText,
  action,
  list,
  color,
  handleCloseSwipeableFromParent,
}: NewListFormProps) => {
  const { ListRepository } = useStores();
  const { handleAddList, handleCopyList, handleEditList, getTheme, getColor } =
    useShoppingListContext();
  const [newList, setNewList] = useState<{ list: string }>({
    list: list ? list.name : "",
  });

  const clearInput = () => {
    setNewList({
      list: "",
    });
  };

  const closeBottomSheet = () => {
    clearInput();
    onClose();
    Keyboard.dismiss();
  };

  const addList = (): void => {
    closeBottomSheet();
    const newItem: IList = {
      uuid: String(UUIDGenerator.v4()),
      name: newList.list,
      tags: [],
      items: [],
      createAt: new Date().getTime(),
    };
    ListRepository.addItem(newItem);
  };

  const copyList = (): void => {
    if (newList.list) {
      closeBottomSheet();
      ListRepository.copyItem(list?.uuid!, newList.list);
      handleCloseSwipeableFromParent && handleCloseSwipeableFromParent();
    }
  };

  const editList = (): void => {
    if (newList.list) {
      closeBottomSheet();
      ListRepository.editItem(list?.uuid!, newList.list);
    }
  };

  const buttonTextArr = {
    add: I18n.t("add"),
    edit: I18n.t("edit"),
    copy: I18n.t("copy"),
  };

  const functions = {
    addList: addList,
    editList: editList,
    copyList: copyList,
  };

  useEffect(() => {
    setNewList({
      list: list ? list.name : "",
    });
  }, [list]);

  return (
    <Styled.Container>
      <Styled.InputContainer>
        <InputText
          background={color.backgroundPrimary}
          color={color.textSecondary}
          placeholderTextColor={color.textSecondary}
          placeholder={I18n.t("listName")}
          onChangeText={(item) => {
            setNewList({
              list: item,
            });
          }}
          value={newList.list}
          onSubmitEditing={functions[action]}
        />
      </Styled.InputContainer>
      <Styled.ButtonsContainer>
        <Styled.ButtonWrapper>
          <Button
            text={I18n.t("cancel")}
            border={color.bottomSheetButtonCancelBorder}
            background={color.bottomSheetButtonCancelBackground}
            textColor={color.bottomSheetButtonCancelText}
            onPress={closeBottomSheet}
            underlayColor={color.bottomSheetButtonCancelBackground}
          />
        </Styled.ButtonWrapper>
        <Styled.ButtonWrapper>
          <Button
            text={buttonTextArr[buttonText]}
            textColor={color.bottomSheetButtonAddText}
            border={color.bottomSheetButtonAddBorder}
            background={color.bottomSheetButtonAddBackground}
            onPress={functions[action]}
            underlayColor={color.bottomSheetButtonAddUnderlay}
          />
        </Styled.ButtonWrapper>
      </Styled.ButtonsContainer>
    </Styled.Container>
  );
};

export default NewListForm;
