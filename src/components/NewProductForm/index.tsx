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
import { IProduct } from "../../Model/IProduct";
import Select from "../InputSelect";
import I18n from "i18n-js";
import { colorTheme } from "../../../constants/Colors";
const countries = ["Egypt", "Canada", "Australia", "Ireland"];
const countries2 = [
  { label: "Selecione uma categoria", value: "" },
  { label: "Canada", value: "1" },
  { label: "Australia", value: "2" },
  { label: "Ireland", value: "3" },
];

export type NewListFormProps = {
  onClose: () => void;
  tagUuid?: string;
  buttonText: "add" | "edit";
  action: "addList" | "editList";
  items?: IProduct;
  productListRef: React.MutableRefObject<{
    handleAddProduct: (product: IProduct) => void;
    handleReloadProduct: () => void;
  } | null>;
  color: colorTheme;
};

const NewProductForm = ({
  onClose,
  tagUuid,
  buttonText,
  action,
  items,
  productListRef,
  color,
}: NewListFormProps) => {
  const colorScheme = useColorScheme();
  const { handleAddListProduct, handleEditListProduct, getTagsObject } =
    useShoppingListContext();
  const [newItem, setNewItem] = useState({
    item: items ? items.name : "",
    tag: tagUuid || "",
  });
  const tags = getTagsObject();
  if (tags) {
    tags.unshift({ name: I18n.t("selectCategory"), uuid: "" });
  }
  const clearInput = () => {
    setNewItem({
      item: "",
      tag: "",
    });
  };

  const closeBottomSheet = () => {
    clearInput();
    onClose();
    Keyboard.dismiss();
  };

  const addList = (): void => {
    if (newItem.item !== "") {
      closeBottomSheet();
      const newProduct = handleAddListProduct(
        newItem.item,
        tagUuid ?? newItem.tag
      );
      if (productListRef.current) {
        productListRef.current.handleAddProduct(newProduct);
      }
    }
  };

  const editList = (): void => {
    if (newItem?.item !== "") {
      closeBottomSheet();
      handleEditListProduct(items?.uuid!, newItem.item, newItem.tag);
      if (productListRef.current) {
        productListRef.current.handleReloadProduct();
      }
    }
  };

  const buttonTextArr = {
    add: I18n.t("add"),
    edit: I18n.t("edit"),
  };

  const functions = {
    addList: addList,
    editList: editList,
  };

  useEffect(() => {
    setNewItem({
      item: items ? items.name : "",
      tag: items ? items.tag : "",
    });
  }, [items]);

  const onValueChange = (itemValue: string, itemIndex: number): void => {
    setNewItem({
      ...newItem,
      tag: itemValue,
    });
  };

  return (
    <Styled.Container>
      <Styled.InputContainer>
        <InputText
          background={color.backgroundPrimary}
          color={color.textSecondary}
          placeholderTextColor={color.textSecondary}
          placeholder={I18n.t("productsName")}
          onChangeText={(item) => {
            setNewItem({
              ...newItem,
              item: item,
            });
          }}
          value={newItem.item}
          onSubmitEditing={functions[action]}
        />
      </Styled.InputContainer>
      {!tagUuid && tags ? (
        <Styled.InputContainer>
          <Select
            background={color.selectCategory}
            dropdownIconColor={color.primary}
            textColor={color.textSecondary}
            items={tags}
            selectedValue={newItem.tag}
            onValueChange={onValueChange}
          />
        </Styled.InputContainer>
      ) : (
        <></>
      )}
      {/* <SelectDropdown
          data={countries}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        /> */}

      <Styled.ButtonsContainer>
        <Styled.ButtonWrapper>
          <Button
            text={I18n.t("cancel")}
            border={color.bottomSheetButtonCancelBorder}
            background={color.bottomSheetButtonCancelBackground}
            textColor={color.bottomSheetButtonCancelText}
            onPress={closeBottomSheet}
            underlayColor={color.bottomSheetButtonCancelBackground}
          />
        </Styled.ButtonWrapper>
        <Styled.ButtonWrapper>
          <Button
            text={buttonTextArr[buttonText]}
            textColor={color.bottomSheetButtonAddText}
            border={color.bottomSheetButtonAddBorder}
            background={color.bottomSheetButtonAddBackground}
            onPress={functions[action]}
            underlayColor={color.bottomSheetButtonAddUnderlay}
          />
        </Styled.ButtonWrapper>
      </Styled.ButtonsContainer>
    </Styled.Container>
  );
};

export default NewProductForm;
