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
  items?: ItemInterface;
};

const NewItemForm = ({
  onClose,
  listId,
  buttonText,
  items,
}: NewItemFormProps) => {
  const colorScheme = useColorScheme();
  const [newItem, setNewItem] = useState({
    item: items ? items.name : "",
  });


  const { list, handleAddListItem } =
    useShoppingListContext();
  const selectedItem = list.find((i) => i.uuid === listId);

  const products = GetListProducts.handle().filter(product => (!selectedItem?.items!.includes(product.uuid)));
  if (products.length > 0) {
    products.unshift({ name: "Selecionar Produto", uuid: "", amount: [], tag: "", unit: "Un" });
  } else {
    products.unshift({ name: "Nenhum Produto", uuid: "", amount: [], tag: "", unit: "Un" });
  }

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


  const addListItem = (): void => {
    if (newItem.item != "") {
      closeBottomSheet();
      handleAddListItem(listId, newItem.item);
    }
  };

  const buttonTextArr = {
    add: "Adicionar",
    edit: "Editar",
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
            border={Colors[colorScheme ?? "light"].bottomSheetButtonCancelBorder}
            background={Colors[colorScheme ?? "light"].bottomSheetButtonCancelBackground}
            textColor={Colors[colorScheme ?? "light"].bottomSheetButtonCancelText}
            onPress={closeBottomSheet}
          />
        </Styled.ButtonWrapper>
        <Styled.ButtonWrapper>
          <Button
            text={buttonTextArr[buttonText]}
            textColor={Colors[colorScheme ?? "light"].bottomSheetButtonAddText}
            border={Colors[colorScheme ?? "light"].bottomSheetButtonAddBorder}
            background={Colors[colorScheme ?? "light"].bottomSheetButtonAddBackground}
            onPress={addListItem}
          />
        </Styled.ButtonWrapper>
      </Styled.ButtonsContainer>
    </Styled.Container>
  );
};

export default NewItemForm;
