import Colors from "../../constants/Colors";
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

export type NewTagFormProps = {
  onClose: () => void;
  buttonText: "add" | "edit";
  action: "addTag" | "editTag";
  tag?: Tag;
};

const NewTagForm = ({
  onClose,
  buttonText,
  action,
  tag,
}: NewTagFormProps) => {
  const colorScheme = useColorScheme();
  const { tags, setTags } =
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

  const handleAddTag = (): void => {

    closeBottomSheet();
    const newTag = returnNewTag();
    saveTagByUuidController.handle(newTag);
    tags ?
      setTags([newTag, ...tags]) :
      setTags([newTag]);
  };

  const handleEditTag = (): void => {
    if (newItem.item) {
      closeBottomSheet();
      const updatedTag: ITag[] = JSON.parse(JSON.stringify(tags));
      const selectedTag = tags.find((item) => item.uuid === tag?.uuid!);
      if (selectedTag) {
        selectedTag.name = newItem.item;

        const newUpdatedList = updatedTag.map(item =>
        (item.uuid === selectedTag.uuid ?
          selectedTag
          :
          item)
        );
        saveTagByUuidController.handle(selectedTag);
        setTags([...newUpdatedList]);
      }
    }
  };

  const buttonTextArr = {
    add: "Adicionar",
    edit: "Editar",
    copy: "Copiar",
  };

  const functions = {
    addTag: handleAddTag,
    editTag: handleEditTag,
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
          placeholder={"Nome da sua categoria..."}
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
            text="Cancelar"
            background={Colors[colorScheme ?? "light"].alert}
            onPress={closeBottomSheet}
          />
        </Styled.ButtonWrapper>
        <Styled.ButtonWrapper>
          <Button
            text={buttonTextArr[buttonText]}
            background={Colors[colorScheme ?? "light"].info}
            onPress={functions[action]}
          />
        </Styled.ButtonWrapper>
      </Styled.ButtonsContainer>
    </Styled.Container>
  );
};

export default NewTagForm;
