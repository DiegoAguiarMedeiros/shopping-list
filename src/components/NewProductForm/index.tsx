import { useColorScheme } from "react-native";
import { Text } from "../Text";
import * as Styled from "./styles";
import InputText from "../InputText";
import Button from "../Button";
import { useEffect, useState } from "react";
import { ItemInterface, ListInterface, TagsIterface } from "../../types/types";
import UUIDGenerator from "react-native-uuid";
import { Keyboard } from "react-native";
import { getTags, removeUndefinedFromArray } from "../../utils/functions";
import { IProduct, ITagsProductsMultiSelect } from "../../Model/IProduct";
import Select from "../InputSelect";
import I18n from "i18n-js";
import { colorTheme } from "../../../constants/Colors";
import { useStores } from "../../context/StoreContext";
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
  const { ProductRepository, TagRepository, ConfigRepository } = useStores();
  const [newItem, setNewItem] = useState({
    item: items ? items.name : "",
    tag: tagUuid ?? "",
  });

  const tags: ITagsProductsMultiSelect[] = !tagUuid ? ProductRepository.getProductsToSelect() : [];
  if (tags) {
    tags.unshift({
      name: I18n.t("selectCategory"),
      id: "",
      children: []
    });
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
      const newProduct: IProduct = {
        uuid: String(UUIDGenerator.v4()),
        name: newItem.item,
        amount: [],
        unit: "Kg",
        tag: tagUuid ?? newItem.tag,
      };
      ProductRepository.addItem(newProduct);
      TagRepository.increaseProductQTD(tagUuid ?? newItem.tag);
      closeBottomSheet();
    }
  };

  const editList = (): void => {
    if (newItem?.item !== "") {
      closeBottomSheet();
      ProductRepository.editItem(items?.uuid!, newItem.item, newItem.tag);
      TagRepository.increaseProductQTD(newItem.tag);
      TagRepository.decreaseProductQTD(items?.tag!);
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
          background={ConfigRepository.color.backgroundPrimary}
          color={ConfigRepository.color.textSecondary}
          placeholderTextColor={ConfigRepository.color.textSecondary}
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
            background={ConfigRepository.color.selectCategory}
            dropdownIconColor={ConfigRepository.color.primary}
            textColor={ConfigRepository.color.textSecondary}
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
            border={ConfigRepository.color.bottomSheetButtonCancelBorder}
            background={ConfigRepository.color.bottomSheetButtonCancelBackground}
            textColor={ConfigRepository.color.bottomSheetButtonCancelText}
            onPress={closeBottomSheet}
            underlayColor={ConfigRepository.color.bottomSheetButtonCancelBackground}
          />
        </Styled.ButtonWrapper>
        <Styled.ButtonWrapper>
          <Button
            text={buttonTextArr[buttonText]}
            textColor={ConfigRepository.color.bottomSheetButtonAddText}
            border={ConfigRepository.color.bottomSheetButtonAddBorder}
            background={ConfigRepository.color.bottomSheetButtonAddBackground}
            onPress={functions[action]}
            underlayColor={ConfigRepository.color.bottomSheetButtonAddUnderlay}
          />
        </Styled.ButtonWrapper>
      </Styled.ButtonsContainer>
    </Styled.Container>
  );
};

export default NewProductForm;
