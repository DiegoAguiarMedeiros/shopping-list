import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import Button from "../Button";
import { Text } from "../Text";
import InputText from "../InputText";
import {
  BottomSheetProps,
  ItemInterface,
  ListInterface,
  ListItemInterface,
  ListType,
  TagsIterface,
} from "../../types/types";
import UUIDGenerator from "react-native-uuid";
import { useShoppingListContext } from "../../context/ShoppingList";
import {
  checkTags,
  getTags,
  removeUndefinedFromArray,
} from "../../utils/functions";
import Tags from "./tags";

const AnimatedBottomSheet = Animated.createAnimatedComponent(
  Styled.BottomSheet
);

const BottomSheetComponent: React.FC<BottomSheetProps> = ({
  items,
  tags,
  isVisible,
  children,
  onClose,
  action,
  listId,
  buttonText,
}) => {
  const animation = useRef(new Animated.Value(0)).current;
  const [tagsFiltered, setTagsFiltered] = useState<TagsIterface[]>([]);
  const colorScheme = useColorScheme();
  const { list, setList, listItem, setListItem, getListItemsOfList } =
    useShoppingListContext();
  const [newItem, setNewItem] = useState({
    item: items ? items.name : "",
    tag: items && !Array.isArray(items.tags) ? items.tags : "",
    edit: false,
  });

  const filterTags = () => {
    if (newItem.tag.length > 0) {
      console.log("if", newItem.tag);
      const newTags = tags?.filter(({ name }) =>
        name.toLowerCase().includes(newItem.tag.toLowerCase())
      );
      setTagsFiltered(newTags ?? []);
    } else {
      console.log("else", newItem.tag);
      setTagsFiltered(tags ?? []);
    }
  };

  useEffect(() => {
    filterTags();
  }, [newItem.tag]);
  console.log("tagsFiltered", tagsFiltered);

  //TODO enviar essas função para o arquivo de funcções
  const returnNewList = (): ListInterface => {
    const item: ListInterface = {
      uuid: String(UUIDGenerator.v4()),
      name: newItem.item,
      tags: [],
      items: [],
    };
    return item;
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

  const handleAddList = (): void => {
    if (newItem.item) {
      handleHideBottomSheet();
      const newList = returnNewList();
      setList((newValue) => ({
        ...newValue,
        [newList.uuid]: newList,
      }));
    }
  };

  const handleEditList = (): void => {
    if (newItem.item) {
      handleHideBottomSheet();
      const updatedList = JSON.parse(JSON.stringify(list));
      const item = updatedList[items?.uuid!];
      if (item) {
        item.name = newItem.item;
        setList(updatedList);
      }
    }
  };
  const handleEditListItem = (): void => {
    if (newItem.item) {
      handleHideBottomSheet();
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

  const handleAddListItem = (): void => {
    handleHideBottomSheet();
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

  const handleCopyList = (): void => {
    if (newItem.item) {
      handleHideBottomSheet();
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

  const buttonTextArr = {
    add: "Adicionar",
    edit: "Editar",
    copy: "Copiar",
  };

  const functions = {
    addList: handleAddList,
    editList: handleEditList,
    addListItem: handleAddListItem,
    editListItem: handleEditListItem,
    copyList: handleCopyList,
  };

  useEffect(() => {
    setNewItem({
      item: items ? items.name : "",
      tag: items && !Array.isArray(items.tags) ? items.tags : "",
      edit: false,
    });
    Animated.timing(animation, {
      toValue: isVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible, animation]);

  const close = () => {
    onClose({
      listId,
      action,
      buttonText,
      isVisible: false,
      onClose,
    });
  };
  const handleHideBottomSheet = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      clearInput();
      close();
    });
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [250, 0],
  });

  if (!isVisible) {
    return null;
  }

  const clearInput = () => {
    setNewItem({
      item: "",
      tag: "",
      edit: false,
    });
  };

  return (
    <AnimatedBottomSheet
      style={{
        height:
          action === "addListItem" || listId === "editListItem" ? 205 : 150,
        backgroundColor:
          Colors[colorScheme ?? "light"].bottomSheetBackgroundColor,
        transform: [{ translateY }],
      }}
    >
      {/* <Button onPress={handleHideBottomSheet} background={Colors[colorScheme ?? 'light'].buttonBackground}>
          <Text>Close</Text>
        </Button> */}
      <Styled.Container>
        <Styled.InputContainer>
          <InputText
            placeholder={listId ? "Nome do item..." : "Nome da sua lista..."}
            onChangeText={(item) => {
              setNewItem({
                item: item,
                tag: newItem.tag,
                edit: true,
              });
            }}
            value={newItem.item}
            onSubmitEditing={functions[action]}
          />
        </Styled.InputContainer>
        {action === "addListItem" || listId === "editListItem" ? (
          <Styled.InputContainer>
            <InputText
              placeholder="Nome da categoria..."
              onChangeText={(tag) => {
                setNewItem({
                  item: newItem.item,
                  tag: tag,
                  edit: true,
                });
              }}
              value={newItem.tag}
              onSubmitEditing={functions[action]}
            />
          </Styled.InputContainer>
        ) : null}

        <Styled.ButtonsContainer>
          <Styled.ButtonWrapper>
            <Button
              text="Cancelar"
              background={Colors[colorScheme ?? "light"].alert}
              onPress={handleHideBottomSheet}
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
      {tags && (
        <Tags
          tags={tagsFiltered}
          isVisible={newItem.tag != "" && tagsFiltered.length > 0}
        />
      )}
    </AnimatedBottomSheet>
  );
};

export default BottomSheetComponent;
