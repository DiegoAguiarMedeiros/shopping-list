import { useColorScheme } from "react-native";
import InputText from "../InputText";
import Button from "../Button";
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { IList } from "../../Model/IList";
import I18n from "i18n-js";
import { colorTheme } from "../../../constants/Colors";
import { useStores } from "../../context/StoreContext";
import UUIDGenerator from "react-native-uuid";
import FormContainer from "../FormContainer";
import ButtonsContainer from "../ButtonsContainer";
import ButtonWrapper from "../ButtonWrapper";
import InputContainer from "../InputContainer";

export type NewListFormProps = {
  onClose: () => void;
  listId?: string;
  buttonText: "add" | "edit" | "copy";
  action: "addList" | "editList" | "copyList";
  list?: IList;
  handleCloseSwipeableFromParent?: () => void;
};

const NewListForm = ({
  onClose,
  listId,
  buttonText,
  action,
  list,
  handleCloseSwipeableFromParent,
}: NewListFormProps) => {
  const { ListRepository, ConfigRepository } = useStores();
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
    <FormContainer>
      <InputContainer>
        <InputText
          background={ConfigRepository.color.backgroundPrimary}
          color={ConfigRepository.color.textSecondary}
          placeholderTextColor={ConfigRepository.color.textSecondary}
          placeholder={I18n.t("listName")}
          onChangeText={(item) => {
            setNewList({
              list: item,
            });
          }}
          value={newList.list}
          onSubmitEditing={functions[action]}
        />
      </InputContainer>
      <ButtonsContainer>
        <ButtonWrapper>
          <Button
            text={I18n.t("cancel")}
            border={ConfigRepository.color.bottomSheetButtonCancelBorder}
            background={ConfigRepository.color.bottomSheetButtonCancelBackground}
            textColor={ConfigRepository.color.bottomSheetButtonCancelText}
            onPress={closeBottomSheet}
            underlayColor={ConfigRepository.color.bottomSheetButtonCancelBackground}
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            text={buttonTextArr[buttonText]}
            textColor={ConfigRepository.color.bottomSheetButtonAddText}
            border={ConfigRepository.color.bottomSheetButtonAddBorder}
            background={ConfigRepository.color.bottomSheetButtonAddBackground}
            onPress={functions[action]}
            underlayColor={ConfigRepository.color.bottomSheetButtonAddUnderlay}
          />
        </ButtonWrapper>
      </ButtonsContainer>
    </FormContainer>
  );
};

export default NewListForm;
