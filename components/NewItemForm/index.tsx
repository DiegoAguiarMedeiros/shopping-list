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
  const products = GetListProducts.handle();
  if (products) {
    products.unshift({ name: "Selecionar Produto", uuid: "", amount: [], tag: "", unit: "Un" });
  }

  const { handleAddListItem } =
    useShoppingListContext();

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
    closeBottomSheet();
    handleAddListItem(listId, newItem.item);
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
            background={Colors[colorScheme ?? "light"].alert}
            onPress={closeBottomSheet}
          />
        </Styled.ButtonWrapper>
        <Styled.ButtonWrapper>
          <Button
            text={buttonTextArr[buttonText]}
            background={Colors[colorScheme ?? "light"].info}
            onPress={addListItem}
          />
        </Styled.ButtonWrapper>
      </Styled.ButtonsContainer>
    </Styled.Container>
  );
};

export default NewItemForm;
