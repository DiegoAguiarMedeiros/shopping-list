import * as Styled from "./styles";
import InputText from "../InputText";
import Button from "../Button";
import { useEffect, useState } from "react";
import UUIDGenerator from "react-native-uuid";
import { Keyboard } from "react-native";
import I18n from "i18n-js";
import { colorTheme } from "../../../constants/Colors";
import ITag from "../../Model/ITag";
import { useStores } from "../../context/StoreContext";

export type NewTagFormProps = {
  onClose: () => void;
  buttonText: "add" | "edit";
  action: "addTag" | "editTag";
  tag?: ITag;
};

const NewTagForm = ({
  onClose,
  buttonText,
  action,
  tag,
}: NewTagFormProps) => {
  const { TagRepository, ConfigRepository } = useStores();
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
      const newTag: ITag = {
        uuid: String(UUIDGenerator.v4()),
        name: newItem.item,
        productsQTD: 0,
      };
      TagRepository.addItem(newTag);
    }
  };

  const editTag = (): void => {
    if (newItem.item) {
      closeBottomSheet();
      TagRepository.editItem(tag?.uuid!, newItem.item);
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
          background={ConfigRepository.color.backgroundPrimary}
          color={ConfigRepository.color.textSecondary}
          placeholderTextColor={ConfigRepository.color.textSecondary}
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
        <Styled.ButtonWrapper margin="0 5px 0 0">
          <Button
            text={I18n.t("cancel")}
            border={ConfigRepository.color.bottomSheetButtonCancelBorder}
            background={ConfigRepository.color.bottomSheetButtonCancelBackground}
            textColor={ConfigRepository.color.bottomSheetButtonCancelText}
            onPress={closeBottomSheet}
            underlayColor={ConfigRepository.color.bottomSheetButtonCancelBackground}
          />
        </Styled.ButtonWrapper>
        <Styled.ButtonWrapper margin="0 0 0 5px">
          <Button
            text={buttonTextArr[buttonText]}
            textColor={ConfigRepository.color.bottomSheetButtonAddText}
            border={ConfigRepository.color.bottomSheetButtonAddBorder}
            background={ConfigRepository.color.bottomSheetButtonAddBackground}
            onPress={functions[action]}
            underlayColor={ConfigRepository.color.bottomSheetButtonAddUnderlay}
          />
        </Styled.ButtonWrapper>
      </Styled.ButtonsContainer>
    </Styled.Container>
  );
};

export default NewTagForm;
