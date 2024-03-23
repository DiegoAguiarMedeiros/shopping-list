import { useColorScheme } from "react-native";
import { Text } from "../Text";
import * as Styled from "./styles";
import InputText from "../InputText";
import Button from "../Button";
import { useEffect, useState } from "react";
import { ItemInterface, ListInterface, TagsIterface } from "../../types/types";
import UUIDGenerator from "react-native-uuid";

import { useShoppingListContext } from "../../context/ShoppingList";
import { Keyboard } from "react-native";
import { getTags, removeUndefinedFromArray } from "../../utils/functions";
import Tag from "../../Domain/Model/Implementation/Tag";
import { IList } from "../../Domain/Model/IList";
import ITag from "../../Domain/Model/ITag";
import { IProduct } from "../../Domain/Model/IProduct";
import saveTagByUuidController from "../../Domain/UseCases/Tag/SaveTagByUuid";
import I18n from "i18n-js";

export type NewTagFormProps = {
  onClose: () => void;
  buttonText: "add" | "edit";
  action: "addTag" | "editTag";
  tag?: Tag;
  tagRef: React.MutableRefObject<{
    handleAddNewTag: (uuid: string) => void;
  } | null>;
};

const NewTagForm = ({
  onClose,
  buttonText,
  action,
  tag,
  tagRef,
}: NewTagFormProps) => {
  const colorScheme = useColorScheme();
  const { handleAddTag, handleEditTag, getTheme, getColor } =
    useShoppingListContext();
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

  const returnNewTag = (): ITag => {
    const item: ITag = {
      uuid: String(UUIDGenerator.v4()),
      name: newItem.item,
    };
    return item;
  };

  const addTag = (): void => {
    if (newItem.item) {
      closeBottomSheet();
      const newTag = handleAddTag(newItem.item);
      if (tagRef.current) {
        tagRef.current.handleAddNewTag(newTag.uuid);
      }
    }
  };

  const editTag = (): void => {
    if (newItem.item) {
      closeBottomSheet();
      handleEditTag(tag?.uuid!, newItem.item);
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
            border={getColor().bottomSheetButtonCancelBorder}
            background={getColor().bottomSheetButtonCancelBackground}
            textColor={getColor().bottomSheetButtonCancelText}
            onPress={closeBottomSheet}
            underlayColor={getColor().bottomSheetButtonCancelUnderlay}
          />
        </Styled.ButtonWrapper>
        <Styled.ButtonWrapper>
          <Button
            text={buttonTextArr[buttonText]}
            textColor={getColor().bottomSheetButtonAddText}
            border={getColor().bottomSheetButtonAddBorder}
            background={getColor().bottomSheetButtonAddBackground}
            onPress={functions[action]}
            underlayColor={getColor().bottomSheetButtonAddUnderlay}
          />
        </Styled.ButtonWrapper>
      </Styled.ButtonsContainer>
    </Styled.Container>
  );
};

export default NewTagForm;
