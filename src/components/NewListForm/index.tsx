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
  list?: IList;
  color: colorTheme;
  listRef: React.MutableRefObject<{
    handleAddNewList: (uuid: string) => void;
  } | null>;
  handleCloseSwipeableFromParent?: () => void;
};

const NewListForm = ({
  onClose,
  listId,
  buttonText,
  action,
  list,
  color,
  listRef,
  handleCloseSwipeableFromParent,
}: NewListFormProps) => {
  const colorScheme = useColorScheme();
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
    const list = handleAddList(newList.list);
    if (listRef.current) {
      listRef.current.handleAddNewList(list.uuid);
    }
  };

  const copyList = (): void => {
    if (newList.list) {
      closeBottomSheet();
      const returnList = handleCopyList(list?.uuid!, newList.list);
      if (listRef.current) {
        listRef.current.handleAddNewList(returnList.uuid);
        handleCloseSwipeableFromParent && handleCloseSwipeableFromParent();
      }
    }
  };

  const editList = (): void => {
    if (newList.list) {
      closeBottomSheet();
      handleEditList(list?.uuid!, newList.list);
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
