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
import ITag from "../../Domain/Model/ITag";
import GetListProducts from "../../Domain/UseCases/ListProduct/GetListProducts";
import addProductToListByUuidController from "../../Domain/UseCases/List/AddProductToListByUuid";
import Select from "../InputSelect";
import getListProductController from "../../Domain/UseCases/ListProduct/GetListProductByUuid";

export type NewItemFormProps = {
  onClose: () => void;
  listId: string;
  buttonText: "add" | "edit";
  action: "addListItem" | "editListItem";
  items?: ItemInterface;
};

const NewItemForm = ({
  onClose,
  listId,
  buttonText,
  action,
  items,
}: NewItemFormProps) => {
  const colorScheme = useColorScheme();
  const [tagsFiltered, setTagsFiltered] = useState<TagsIterface[]>([]);
  const [newItem, setNewItem] = useState({
    item: items ? items.name : "",
  });
  const products = GetListProducts.handle();
  if (products) {
    products.unshift({ name: "Selecionar Produto", uuid: "", amount: [], tag: "", unit: "Un" });
  }

  const { list, setList, listProduct, setListProduct } =
    useShoppingListContext();

  const clearInput = () => {
    setNewItem({
      item: "",
    });
  };
  const handleAddTag = (tag: string): void => {
    setNewItem({
      item: newItem.item,
    });
    setTagsFiltered([]);
  };
  const closeBottomSheet = () => {
    clearInput();
    onClose();
    Keyboard.dismiss();
  };


  const handleAddListItem = (): void => {
    if (newItem.item !== "") {
      addProductToListByUuidController.handle(listId, newItem.item)
      closeBottomSheet();
      const product = getListProductController.handle([newItem.item])
      listProduct ?
        setListProduct([product[0], ...listProduct]) :
        setListProduct([product[0]]);

      const newList = list.map((l) => {
        if (l.uuid === listId) {
          l.items.push(newItem.item);
          if (!l.tags.includes(product[0].tag)) l.tags.push(product[0].tag);
        }
        return l;
      })
      setList([...newList]);
    }
  };

  const handleAddListItemInList = (
    listId: string,
    newListItem: ItemInterface
  ): void => {
    // const updatedList: ListType = JSON.parse(JSON.stringify(list));
    // const item = updatedList[listId];
    // if (item) {
    //   const listArrItems: ItemInterface[] = removeUndefinedFromArray(
    //     getListItemsOfList(item.items)
    //   );
    //   item.items.push(newListItem.uuid);
    //   setList(updatedList);
    // }
  };

  const handleEditListItem = (): void => {
    // if (newItem.item) {
    //   closeBottomSheet();
    //   const updatedListItem: ListItemInterface = JSON.parse(
    //     JSON.stringify(listItem)
    //   );
    //   const item = updatedListItem[items?.uuid!];
    //   if (item) {
    //     item.name = newItem.item;
    //     item.tags = newItem.tag;
    //     setListItem(updatedListItem);
    //   }
    // }
  };

  const buttonTextArr = {
    add: "Adicionar",
    edit: "Editar",
  };

  const functions = {
    addListItem: handleAddListItem,
    editListItem: handleEditListItem,
  };


  useEffect(() => {
    setNewItem({
      item: items ? items.name : "",
    });
  }, [items]);

  const onValueChange = (itemValue: string, itemIndex: number): void => {
    setNewItem({
      item: itemValue,
    });
  };
  return (
    <Styled.Container>

      <Styled.InputContainer>
        {products
          ?
          <Select items={products} selectedValue={newItem.item} onValueChange={onValueChange} />
          :
          <></>}
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

export default NewItemForm;
