import { Keyboard, useColorScheme } from "react-native";
import * as Styled from "./styles";
import Button from "../Button";
import { useEffect, useState } from "react";
import { ItemInterface } from "../../types/types";
import { useShoppingListContext } from "../../context/ShoppingList";
import Select from "../InputSelect";
import I18n from "i18n-js";
import { colorTheme } from "../../../constants/Colors";
import { IList } from "../../Model/IList";
import { IProduct } from "../../Model/IProduct";

export type NewItemFormProps = {
  onClose: () => void;
  listId: string;
  buttonText: "add" | "edit";
  items?: ItemInterface;
  color: colorTheme;
  listItemRef: React.MutableRefObject<{
    handleAddItem: (list: IList) => void;
  } | null>;
};

const NewItemForm = ({
  onClose,
  listId,
  buttonText,
  items,
  color,
  listItemRef,
}: NewItemFormProps) => {
  const [newItem, setNewItem] = useState({
    item: items ? items.name : "",
  });

  const { handleAddListItem, getAllProductsObjects } = useShoppingListContext();

  const products = getAllProductsObjects();
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
      const list = handleAddListItem(listId, newItem.item);
      console.log("list", list);
      if (listItemRef?.current) {
        console.log("list if", list);
        listItemRef.current.handleAddItem(list);
      }
    }
  };

  useEffect(() => {
    console.log("listItemRef", listItemRef);
    if (listItemRef?.current) {
      console.log("listItemRef.current", listItemRef.current);
    }
  }, []);

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
            color={color}
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
            border={color.bottomSheetButtonCancelBorder}
            background={color.bottomSheetButtonCancelBackground}
            textColor={color.bottomSheetButtonCancelText}
            onPress={closeBottomSheet}
            underlayColor={color.bottomSheetButtonCancelUnderlay}
          />
        </Styled.ButtonWrapper>
        <Styled.ButtonWrapper>
          <Button
            text={buttonTextArr[buttonText]}
            textColor={color.bottomSheetButtonAddText}
            border={color.bottomSheetButtonAddBorder}
            background={color.bottomSheetButtonAddBackground}
            onPress={addListItem}
            underlayColor={color.bottomSheetButtonAddUnderlay}
          />
        </Styled.ButtonWrapper>
      </Styled.ButtonsContainer>
    </Styled.Container>
  );
};

export default NewItemForm;
