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
import I18n from "i18n-js";

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

  const { list, handleAddListItem, getTheme } = useShoppingListContext();
  const selectedItem = list.find((i) => i.uuid === listId);

  const products = GetListProducts.handle().filter(
    (product) => !selectedItem?.items!.includes(product.uuid)
  );
  if (products.length > 0) {
    products.unshift({
      name: I18n.t("selectProduct"),
      uuid: "",
      amount: [],
      tag: "",
      unit: "Un",
    });
  } else {
    products.unshift({
      name: I18n.t("noProducts"),
      uuid: "",
      amount: [],
      tag: "",
      unit: "Un",
    });
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
    add: I18n.t("add"),
    edit: I18n.t("edit"),
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
        {products ? (
          <Select
            items={products}
            selectedValue={newItem.item}
            onValueChange={onValueChange}
          />
        ) : (
          <></>
        )}
      </Styled.InputContainer>
      <Styled.ButtonsContainer>
        <Styled.ButtonWrapper>
          <Button
            text={I18n.t("cancel")}
            border={Colors[getTheme()].bottomSheetButtonCancelBorder}
            background={Colors[getTheme()].bottomSheetButtonCancelBackground}
            textColor={Colors[getTheme()].bottomSheetButtonCancelText}
            onPress={closeBottomSheet}
            underlayColor={Colors[getTheme()].bottomSheetButtonCancelUnderlay}
          />
        </Styled.ButtonWrapper>
        <Styled.ButtonWrapper>
          <Button
            text={buttonTextArr[buttonText]}
            textColor={Colors[getTheme()].bottomSheetButtonAddText}
            border={Colors[getTheme()].bottomSheetButtonAddBorder}
            background={Colors[getTheme()].bottomSheetButtonAddBackground}
            onPress={addListItem}
            underlayColor={Colors[getTheme()].bottomSheetButtonAddUnderlay}
          />
        </Styled.ButtonWrapper>
      </Styled.ButtonsContainer>
    </Styled.Container>
  );
};

export default NewItemForm;
