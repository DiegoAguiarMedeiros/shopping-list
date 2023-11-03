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
import List from "../../Domain/Model/Implementation/List";
import { IList } from "../../Domain/Model/IList";
import ITag from "../../Domain/Model/ITag";
import { IProduct } from "../../Domain/Model/IProduct";
import saveListByUuidController from "../../Domain/UseCases/List/SaveListByUuid";
import getListProductController from "../../Domain/UseCases/ListProduct/GetListProduct";

export type NewListFormProps = {
  onClose: () => void;
  listId?: string;
  buttonText: "add" | "edit" | "copy";
  action: "addList" | "editList" | "copyList";
  items?: List;
};

const NewListForm = ({
  onClose,
  listId,
  buttonText,
  action,
  items,
}: NewListFormProps) => {
  const colorScheme = useColorScheme();
  const { list, setList, listProduct, setListProduct } =
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

  const returnNewList = (): IList => {
    const item: IList = {
      uuid: String(UUIDGenerator.v4()),
      name: newItem.item,
      tags: [],
      items: [],
    };
    return item;
  };

  const handleAddList = (): void => {
    closeBottomSheet();
    const newList = returnNewList();
    saveListByUuidController.handle(newList);
    setList([newList, ...list]);
  };


  const handleCopyList = (): void => {
    if (newItem.item) {
      closeBottomSheet();
      const newList = returnNewList();
      const selectedItem = list.find((item) => item.uuid === items?.uuid!);
      if (selectedItem) {
        const returnHandleCopyListItem = handleCopyListItem(selectedItem.items);
        newList.items = returnHandleCopyListItem.items;
        newList.tags = returnHandleCopyListItem.tags;
        setList([newList, ...list]);
      }
    }
  };

  interface ReturnHandleCopyListItem {
    items: string[];
    tags: ITag[];
  }

  const handleCopyListItem = (
    listItems: string[]
  ): ReturnHandleCopyListItem => {
    const copyListItem: IProduct[] = JSON.parse(
      JSON.stringify(
        removeUndefinedFromArray(getListProductController.handle(listItems))
      )
    );
    return {
      items: copyListItem.map((item) => {
        item.amount = [];
        item.uuid = String(UUIDGenerator.v4());
        setListProduct((newValue) => ({
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
      const updatedList: IList[] = JSON.parse(JSON.stringify(list));
      const selectedItem = list.find((item) => item.uuid === items?.uuid!);
      if (selectedItem) {
        selectedItem.name = newItem.item;

        const newUpdatedList = updatedList.map(item =>
        (item.uuid === selectedItem.uuid ?
          selectedItem
          :
          item)
        );
        saveListByUuidController.handle(selectedItem);
        setList([...newUpdatedList]);
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
