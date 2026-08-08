import { Dimensions, Keyboard, StyleSheet, View } from "react-native";
import Button from "../Button";
import { useEffect, useState } from "react";
import { ItemInterface } from "../../types/types";
import Select from "../InputSelect";
import I18n from "i18n-js";
import { colorTheme } from "../../../constants/Colors";
import { IList } from "../../Model/IList";
import { IProduct, ITagsProductsMultiSelect } from "../../Model/IProduct";
import MultiSelect from "../InputMultiSelect";
import { useStores } from "../../context/StoreContext";
import FormContainer from "../FormContainer";
import InputContainer from "../InputContainer";
import ButtonsContainer from "../ButtonsContainer";
import ButtonWrapper from "../ButtonWrapper";
import UUIDGenerator from "react-native-uuid";
import IAmount from "../../Model/IAmount";

export type NewItemFormProps = {
  onClose: () => void;
  list: IList;
  buttonText: "add" | "edit";
  items?: ItemInterface;
};

const NewItemForm = ({
  onClose,
  list,
  buttonText,
  items,
}: NewItemFormProps) => {
  const [newItem, setNewItem] = useState<{
    item: string[];
  }>({
    item: [],
  });
  const [itemQuantities, setItemQuantities] = useState<Record<string, string>>({});

  const { ListRepository, ProductRepository, AmountRepository, ConfigRepository } = useStores();

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
    setItemQuantities({});
  };

  const closeBottomSheet = () => {
    clearInput();
    onClose();
    Keyboard.dismiss();
  };

  const addListItem = (): void => {
    closeBottomSheet();
    ListRepository.addItemsTolist(newItem.item, itemQuantities);

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
    <FormContainer>
      <InputContainer>
        <MultiSelect
          onFocus={updateSelect}
          items={products || []}
          selectedItems={newItem.item}
          onValueChange={onValueChange}
          onQuantitiesChange={(qts) => setItemQuantities(qts)}
        />
      </InputContainer>
      <ButtonsContainer>
        <ButtonWrapper>
          <Button
            text={I18n.t("cancel")}
            radius
            border={ConfigRepository.color.bottomSheetButtonCancelBorder}
            background={ConfigRepository.color.bottomSheetButtonCancelBackground}
            textColor={ConfigRepository.color.bottomSheetButtonCancelText}
            onPress={closeBottomSheet}
            underlayColor={ConfigRepository.color.bottomSheetButtonCancelUnderlay}
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            text={buttonTextArr[buttonText]}
            radius
            textColor={ConfigRepository.color.bottomSheetButtonAddText}
            border={ConfigRepository.color.bottomSheetButtonAddBorder}
            background={ConfigRepository.color.bottomSheetButtonAddBackground}
            onPress={addListItem}
            underlayColor={ConfigRepository.color.bottomSheetButtonAddUnderlay}
          />
        </ButtonWrapper>
      </ButtonsContainer>
    </FormContainer>
  );
};

export default NewItemForm;
