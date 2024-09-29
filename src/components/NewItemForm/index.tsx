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
import { IProduct, ITagsProductsMultiSelect } from "../../Model/IProduct";
import MultiSelect from "../InputMultiSelect";
import { useStores } from "../../context/StoreContext";

export type NewItemFormProps = {
  onClose: () => void;
  list: IList;
  buttonText: "add" | "edit";
  items?: ItemInterface;
  color: colorTheme;
};

const NewItemForm = ({
  onClose,
  list,
  buttonText,
  items,
  color,
}: NewItemFormProps) => {
  const [newItem, setNewItem] = useState<{
    item: string[];
  }>({
    item: [],
  });

  const { ListRepository, ProductRepository } = useStores();

  const [products, setProducts] = useState<ITagsProductsMultiSelect[]>(
    ProductRepository.getProductsToSelect()
  );
  const updateSelect = (): void => {
    setProducts(ProductRepository.getProductsToSelect());
  };

  const clearInput = () => {
    setNewItem({
      item: [],
    });
  };

  const closeBottomSheet = () => {
    clearInput();
    onClose();
    Keyboard.dismiss();
  };

  const addListItem = (): void => {
    closeBottomSheet();
    ListRepository.addItemsTolist(newItem.item);
    ListRepository.updateTags(
      ProductRepository.getAllTagsByProductUuid(
        ListRepository?.listActive?.items ?? newItem.item
      )
    );
    ListRepository.updateTotal(0);
    ListRepository.updateTotalUn(ListRepository?.listActive?.items.length ?? newItem.item.length);
    ListRepository.updateTotalWithAmount(0);
    ProductRepository.load();
    updateSelect();
  };

  const buttonTextArr = {
    add: I18n.t("add"),
    edit: I18n.t("edit"),
  };

  const onValueChange = (itemValue: string[]): void => {
    setNewItem({
      item: itemValue,
    });
  };
  return (
    <Styled.Container>
      <Styled.InputContainer>
        <MultiSelect
          onFocus={updateSelect}
          color={color}
          items={products || []}
          selectedItems={newItem.item}
          onValueChange={onValueChange}
        />
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
