import * as Styled from "./styles";
import InputText from "../InputText";
import Button from "../Button";
import { useEffect, useState } from "react";

import { useShoppingListContext } from "../../context/ShoppingList";
import { Keyboard } from "react-native";
import I18n from "i18n-js";
import { colorTheme } from "../../../constants/Colors";
import ITag from "../../Model/ITag";

export type NewTagFormProps = {
  onClose: () => void;
  buttonText: "add" | "edit";
  action: "addTag" | "editTag";
  tag?: ITag;
  tagRef: React.MutableRefObject<{
    handleAddNewTag: (tag: ITag) => void;
    handleReloadTag(): void;
  } | null>;
  color: colorTheme;
};

const NewTagForm = ({
  onClose,
  buttonText,
  action,
  tag,
  tagRef,
  color,
}: NewTagFormProps) => {
  const { handleAddTag, handleEditTag } = useShoppingListContext();
  const [newItem, setNewItem] = useState({
    item: tag ? tag.name : "",
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

  const addTag = (): void => {
    if (newItem.item) {
      closeBottomSheet();
      const newTag = handleAddTag(newItem.item);
      if (tagRef.current) {
        tagRef.current.handleAddNewTag(newTag);
      }
    }
  };

  const editTag = (): void => {
    if (newItem.item) {
      closeBottomSheet();
      handleEditTag(tag?.uuid!, newItem.item);
      if (tagRef.current) {
        tagRef.current.handleReloadTag();
      }
    }
  };

  const buttonTextArr = {
    add: I18n.t("add"),
    edit: I18n.t("edit"),
    copy: I18n.t("copy"),
  };

  const functions = {
    addTag: addTag,
    editTag: editTag,
  };

  useEffect(() => {
    setNewItem({
      item: tag ? tag.name : "",
    });
  }, [tag]);

  return (
    <Styled.Container>
      <Styled.InputContainer>
        <InputText
          background={color.backgroundPrimary}
          color={color.textSecondary}
          placeholderTextColor={color.textSecondary}
          placeholder={I18n.t("categoryName")}
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

export default NewTagForm;
