import Colors from "../../constants/Colors";
import { Keyboard, useColorScheme } from "react-native";
import { Text } from "../Text";
import * as Styled from "./styles";
import InputText from "../InputText";
import Button from "../Button";
import { useEffect, useState } from "react";
import {
  ItemInterface,
  ListInterface,
  ListItemInterface,
  ListType,
  TagsIterface,
} from "../../types/types";
import {
  checkTags,
  getTags,
  removeUndefinedFromArray,
} from "../../utils/functions";
import list from "../../utils/list";
import UUIDGenerator from "react-native-uuid";
import { useShoppingListContext } from "../../context/ShoppingList";
import Tags from "../Tags";

export type NewItemFormProps = {
  onClose: () => void;
  listId: string;
  buttonText: "add" | "edit";
  action: "addListItem" | "editListItem";
  items?: ItemInterface;
  tags: TagsIterface[];
};

const NewItemForm = ({
  onClose,
  listId,
  buttonText,
  action,
  items,
  tags,
}: NewItemFormProps) => {
  const colorScheme = useColorScheme();
  const [tagsFiltered, setTagsFiltered] = useState<TagsIterface[]>([]);
  const [newItem, setNewItem] = useState({
    item: items ? items.name : "",
    tag: items && !Array.isArray(items.tags) ? items.tags : "",
  });

  const { list, setList, listItem, setListItem, getListItemsOfList } =
    useShoppingListContext();

  const clearInput = () => {
    setNewItem({
      item: "",
      tag: "",
    });
  };
  const handleAddTag = (tag: string): void => {
    setNewItem({
      item: newItem.item,
      tag: tag,
    });
    setTagsFiltered([]);
  };
  const closeBottomSheet = () => {
    clearInput();
    onClose();
    Keyboard.dismiss();
  };

  const returnNewListItem = (): ItemInterface => {
    const item: ItemInterface = {
      uuid: String(UUIDGenerator.v4()),
      name: newItem.item,
      active: false,
      tags: newItem.tag,
      amount: [],
    };
    return item;
  };

  const handleAddListItem = (): void => {
    closeBottomSheet();
    const newListItem = returnNewListItem();
    setListItem((newValue) => ({
      ...newValue,
      [newListItem.uuid]: newListItem,
    }));
    handleAddListItemInList(listId, newListItem);
  };

  const handleAddListItemInList = (
    listId: string,
    newListItem: ItemInterface
  ): void => {
    const updatedList: ListType = JSON.parse(JSON.stringify(list));
    const item = updatedList[listId];
    if (item) {
      const listArrItems: ItemInterface[] = removeUndefinedFromArray(
        getListItemsOfList(item.items)
      );
      item.items.push(newListItem.uuid);
      item.tags = getTags(listArrItems);
      if (!checkTags(newListItem.tags, item.tags)) {
        item.tags.push({
          id: `${item.tags.length++}`,
          name: newListItem.tags,
          active: false,
        });
      }
      setList(updatedList);
    }
  };

  const handleEditListItem = (): void => {
    if (newItem.item) {
      closeBottomSheet();
      const updatedListItem: ListItemInterface = JSON.parse(
        JSON.stringify(listItem)
      );
      const item = updatedListItem[items?.uuid!];
      if (item) {
        item.name = newItem.item;
        item.tags = newItem.tag;
        setListItem(updatedListItem);
      }
    }
  };

  const buttonTextArr = {
    add: "Adicionar",
    edit: "Editar",
  };

  const functions = {
    addListItem: handleAddListItem,
    editListItem: handleEditListItem,
  };

  const filterTags = () => {
    if (newItem.tag.length > 0) {
      const newTags = tags?.filter(({ name }) =>
        name.toLowerCase().includes(newItem.tag.toLowerCase())
      );
      setTagsFiltered(newTags ?? []);
    } else {
      setTagsFiltered(tags ?? []);
    }
  };

  useEffect(() => {
    setNewItem({
      item: items ? items.name : "",
      tag: items && !Array.isArray(items.tags) ? items.tags : "",
    });
  }, [items]);

  useEffect(() => {
    filterTags();
  }, [newItem.tag]);

  return (
    <Styled.Container>
      <Styled.InputContainer>
        <InputText
          placeholder={"Nome do item..."}
          onChangeText={(item) => {
            setNewItem({
              item: item,
              tag: newItem.tag,
            });
          }}
          value={newItem.item}
          onSubmitEditing={functions[action]}
        />
      </Styled.InputContainer>
      <Styled.InputContainer>
        <InputText
          placeholder="Nome da categoria..."
          onChangeText={(tag) => {
            setNewItem({
              item: newItem.item,
              tag: tag,
            });
          }}
          value={newItem.tag}
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
      {tags.length > 0 && (
        <Tags
          tags={tagsFiltered}
          isVisible={
            newItem.tag != "" &&
            tagsFiltered.length > 0 &&
            tagsFiltered[0].name !== newItem.tag
          }
          addTag={handleAddTag}
        />
      )}
    </Styled.Container>
  );
};

export default NewItemForm;
