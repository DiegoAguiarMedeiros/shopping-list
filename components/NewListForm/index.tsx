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

export type NewListFormProps = {
  onClose: () => void;
  listId?: string;
  buttonText: "add" | "edit" | "copy";
  action: "addList" | "editList" | "copyList";
  items?: ListInterface | ItemInterface;
};

const NewListForm = ({
  onClose,
  listId,
  buttonText,
  action,
  items,
}: NewListFormProps) => {
  const colorScheme = useColorScheme();
  const { list, setList, listItem, setListItem, getListItemsOfList } =
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

  const returnNewList = (): ListInterface => {
    const item: ListInterface = {
      uuid: String(UUIDGenerator.v4()),
      name: newItem.item,
      tags: [],
      items: [],
    };
    return item;
  };

  const handleAddList = (): void => {
    closeBottomSheet();
    if (newItem.item) {
      const newList = returnNewList();
      setList((newValue) => ({
        ...newValue,
        [newList.uuid]: newList,
      }));
    }
  };

  const handleCopyList = (): void => {
    if (newItem.item) {
      closeBottomSheet();
      const newItem = returnNewList();
      const itemCopy: ListInterface = JSON.parse(
        JSON.stringify(list[items?.uuid!])
      );
      const returnHandleCopyListItem = handleCopyListItem(itemCopy.items);
      newItem.items = returnHandleCopyListItem.items;
      newItem.tags = returnHandleCopyListItem.tags;
      setList((newValue) => ({
        ...newValue,
        [newItem.uuid]: newItem,
      }));
    }
  };

  interface ReturnHandleCopyListItem {
    items: string[];
    tags: TagsIterface[];
  }

  const handleCopyListItem = (
    listItems: string[]
  ): ReturnHandleCopyListItem => {
    const copyListItem: ItemInterface[] = JSON.parse(
      JSON.stringify(removeUndefinedFromArray(getListItemsOfList(listItems)))
    );
    return {
      items: copyListItem.map((item) => {
        item.amount = [];
        item.uuid = String(UUIDGenerator.v4());
        setListItem((newValue) => ({
          ...newValue,
          [item.uuid]: item,
        }));
        return item.uuid;
      }),
      tags: getTags(copyListItem),
    };
  };

  const handleEditList = (): void => {
    if (newItem.item) {
      closeBottomSheet();
      const updatedList = JSON.parse(JSON.stringify(list));
      const item = updatedList[items?.uuid!];
      if (item) {
        item.name = newItem.item;
        setList(updatedList);
      }
    }
  };

  const buttonTextArr = {
    add: "Adicionar",
    edit: "Editar",
    copy: "Copiar",
  };

  const functions = {
    addList: handleAddList,
    editList: handleEditList,
    copyList: handleCopyList,
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
          placeholder={"Nome da sua lista..."}
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

export default NewListForm;
