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

export type NewListFormProps = {
  onClose: () => void;
  listId?: string;
  buttonText: "add" | "edit" | "copy";
  action: "addList" | "editList" | "copyList";
  items?: IList;
  color: colorTheme;
  listRef: React.MutableRefObject<{
    handleAddNewList: (uuid: string) => void;
  } | null>;
};

const NewListForm = ({
  onClose,
  listId,
  buttonText,
  action,
  items,
  color,
  listRef,
}: NewListFormProps) => {
  const colorScheme = useColorScheme();
  const { handleAddList, handleCopyList, handleEditList, getTheme, getColor } =
    useShoppingListContext();
  const [newItem, setNewItem] = useState({
    item: items ? items.name : "",
  });

  const clearInput = () => {
    setNewItem({
      item: "",
    });
  };

  const closeBottomSheet = () => {
    clearInput();
    onClose();
    Keyboard.dismiss();
  };

  const addList = (): void => {
    closeBottomSheet();
    const newList = handleAddList(newItem.item);
    if (listRef.current) {
      listRef.current.handleAddNewList(newList.uuid);
    }
  };

  const copyList = (): void => {
    if (newItem.item) {
      closeBottomSheet();
      handleCopyList(items?.uuid!, newItem.item);
    }
  };

  const editList = (): void => {
    if (newItem.item) {
      closeBottomSheet();
      handleEditList(items?.uuid!, newItem.item);
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
    setNewItem({
      item: items ? items.name : "",
    });
  }, [items]);

  return (
    <Styled.Container>
      <Styled.InputContainer>
        <InputText
          background={color.backgroundPrimary}
          color={color.textSecondary}
          placeholderTextColor={color.textSecondary}
          placeholder={I18n.t("listName")}
          onChangeText={(item) => {
            setNewItem({
              item: item,
            });
          }}
          value={newItem.item}
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
