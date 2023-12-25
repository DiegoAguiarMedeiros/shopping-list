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
import saveListProductByUuid from "../../Domain/UseCases/ListProduct/SaveListProductByUuid";
import GetTags from "../../Domain/UseCases/Tag/GetTags";
import Select from "../InputSelect";
import Tag from "../../Domain/Model/Implementation/Tag";
const countries = ["Egypt", "Canada", "Australia", "Ireland"]
const countries2 = [{ label: "Selecione uma categoria", value: "" }, { label: "Canada", value: "1" }, { label: "Australia", value: "2" }, { label: "Ireland", value: "3" },]


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
  const { list, setList, listProduct, setListProduct } =
    useShoppingListContext();
  const [newItem, setNewItem] = useState({
    item: items ? items.name : "",
    tag: tagUuid ? tagUuid : "",
  });
  const tags = GetTags.handle();
  if (tags) {
    tags.unshift({ name: "Selecionar Categoria", uuid: "" });
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

  const returnNewList = (): IProduct => {
    const item: IProduct = {
      uuid: String(UUIDGenerator.v4()),
      name: newItem.item,
      tag: tagUuid ? tagUuid : newItem.tag,
      amount: [],
      unit: "Un",
    };
    return item;
  };

  const handleAddList = (): void => {
    closeBottomSheet();
    const newList = returnNewList();
    saveListProductByUuid.handle(newList);
    list ?
      setListProduct([newList, ...listProduct]) :
      setListProduct([newList]);
  };

  const handleEditList = (): void => {
    if (newItem && newItem.item) {
      closeBottomSheet();
      const updatedList: IProduct[] = JSON.parse(JSON.stringify(listProduct));
      const selectedItem = listProduct.find((item) => item.uuid === items?.uuid!);
      if (selectedItem) {
        selectedItem.name = newItem.item;

        const newUpdatedList = updatedList.map(item =>
        (item.uuid === selectedItem.uuid ?
          selectedItem
          :
          item)
        );
        saveListProductByUuid.handle(selectedItem);
        setListProduct([...newUpdatedList]);
      }
    }
  };

  const buttonTextArr = {
    add: "Adicionar",
    edit: "Editar",
  };

  const functions = {
    addList: handleAddList,
    editList: handleEditList,
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
          placeholder={"Nome do produto..."}
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
      {!tagUuid && tags ?
        <Styled.InputContainer>
          <Select items={tags} selectedValue={newItem.tag} onValueChange={onValueChange} />
        </Styled.InputContainer>
        :
        <></>
      }
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

export default NewProductForm;
