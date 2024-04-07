import { TextInput, useColorScheme } from "react-native";
import { Text } from "../Text";
import * as Styled from "./styles";
import InputText from "../InputText";
import Button from "../Button";
import { useEffect, useRef, useState } from "react";
import { ItemInterface, ListInterface, TagsIterface } from "../../types/types";
import UUIDGenerator from "react-native-uuid";
import { useShoppingListContext } from "../../context/ShoppingList";
import { Keyboard } from "react-native";
import { getTags, removeUndefinedFromArray } from "../../utils/functions";
import List from "../../Domain/Model/Implementation/List";
import { IList } from "../../Domain/Model/IList";
import ITag from "../../Domain/Model/ITag";
import { IProduct } from "../../Domain/Model/IProduct";
import saveListByUuidController from "../../Domain/UseCases/List/SaveListByUuid";
import getListProductController from "../../Domain/UseCases/ListProduct/GetProductByUuid";
import I18n from "i18n-js";
import { colorTheme } from "../../constants/Colors";

export type NewListFormProps = {
  onClose: () => void;
  listId?: string;
  buttonText: "add" | "edit" | "copy";
  action: "addList" | "editList" | "copyList";
  items?: IList;
  color: colorTheme;
};

const NewListForm = ({
  onClose,
  listId,
  buttonText,
  action,
  items,
  color,
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
    handleAddList(newItem.item);
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
