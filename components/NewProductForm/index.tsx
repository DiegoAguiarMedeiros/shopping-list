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
import saveListProductByUuid from "../../Domain/UseCases/ListProduct/SaveListProductByUuid";
import GetTags from "../../Domain/UseCases/Tag/GetTags";
import Select from "../InputSelect";
import Tag from "../../Domain/Model/Implementation/Tag";
import I18n from "i18n-js";
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
};

const NewProductForm = ({
  onClose,
  tagUuid,
  buttonText,
  action,
  items,
}: NewListFormProps) => {
  const colorScheme = useColorScheme();
  const { handleAddListProduct, handleEditListProduct, getTheme, getColor } =
    useShoppingListContext();
  const [newItem, setNewItem] = useState({
    item: items ? items.name : "",
    tag: tagUuid || "",
  });
  const tags = GetTags.handle();
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
      handleAddListProduct(newItem.item, tagUuid ?? newItem.tag);
    }
  };

  const editList = (): void => {
    if (newItem?.item !== "") {
      closeBottomSheet();
      handleEditListProduct(items?.uuid!, newItem.item, newItem.tag);
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
            border={getColor().bottomSheetButtonCancelBorder}
            background={getColor().bottomSheetButtonCancelBackground}
            textColor={getColor().bottomSheetButtonCancelText}
            onPress={closeBottomSheet}
            underlayColor={getColor().bottomSheetButtonCancelUnderlay}
          />
        </Styled.ButtonWrapper>
        <Styled.ButtonWrapper>
          <Button
            text={buttonTextArr[buttonText]}
            textColor={getColor().bottomSheetButtonAddText}
            border={getColor().bottomSheetButtonAddBorder}
            background={getColor().bottomSheetButtonAddBackground}
            onPress={functions[action]}
            underlayColor={getColor().bottomSheetButtonAddUnderlay}
          />
        </Styled.ButtonWrapper>
      </Styled.ButtonsContainer>
    </Styled.Container>
  );
};

export default NewProductForm;
