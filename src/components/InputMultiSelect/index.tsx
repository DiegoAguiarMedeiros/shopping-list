import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  TextInputKeyPressEvent,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { IProductTiny, ITagsProductsMultiSelect } from "../../Model/IProduct";
import I18n from "i18n-js";
import { useStores } from "../../context/StoreContext";
import { Title, Title2, Text, SubTitle } from "../Text";
import QuantitySelector from "../QuantitySelector";
import { formatInput } from "../../utils/functions";

type MultiSelectProps = {
  items: ITagsProductsMultiSelect[];
  selectedItems: string[];
  onValueChange: (itemValue: string[]) => void;
  onQuantitiesChange?: (quantities: Record<string, string>) => void;
  onFocus?: () => void;
};

type CategoryRowProps = {
  category: ITagsProductsMultiSelect;
  isCollapsed: boolean;
  color: string;
  onToggle: (categoryId: string) => void;
};

const CategoryRow = React.memo(({ category, isCollapsed, color, onToggle }: CategoryRowProps) => (
  <TouchableOpacity
    activeOpacity={0.8}
    style={styles.categoryHeader}
    onPress={() => onToggle(category.id)}
  >
    <SubTitle color={color} style={{ flex: 1 }}>
      {category.name}
    </SubTitle>
    <FontAwesome
      name={isCollapsed ? "angle-down" : "angle-up"}
      size={22}
      color={color}
    />
  </TouchableOpacity>
));

type ProductRowProps = {
  product: IProductTiny;
  isSelected: boolean;
  quantity: string;
  colors: {
    border: string;
    primary: string;
    text: string;
    textSecondary: string;
    quantityBackground: string;
  };
  onToggle: (productId: string) => void;
  onQuantityDelta: (productId: string, delta: number) => void;
  onQuantityChange: (productId: string, value: string) => void;
  onDecimalInputChange: (event: TextInputKeyPressEvent, productId: string) => void;
};

const ProductRow = React.memo(({
  product,
  isSelected,
  quantity,
  colors,
  onToggle,
  onQuantityDelta,
  onQuantityChange,
  onDecimalInputChange,
}: ProductRowProps) => (
  <View style={[styles.productRow, { borderColor: colors.border }]}>
    <TouchableOpacity
      style={styles.productCheckTouch}
      onPress={() => onToggle(product.id)}
    >
      <FontAwesome
        name={isSelected ? "check-square" : "square-o"}
        size={22}
        color={isSelected ? colors.primary : colors.textSecondary}
      />
      <Text color={isSelected ? colors.text : colors.textSecondary}>
        {product.name}
      </Text>
    </TouchableOpacity>

    {isSelected ? (
      <QuantitySelector
        value={quantity}
        onDecrement={() => onQuantityDelta(product.id, -1)}
        onIncrement={() => onQuantityDelta(product.id, 1)}
        onChangeText={(value) => onQuantityChange(product.id, value)}
        type={quantity.includes('.')}
        handleDecimalInputChange={(event) => onDecimalInputChange(event, product.id)}
        TextInputBackgoundColor={colors.quantityBackground}
      />
    ) : null}
  </View>
));

const MultiSelect = ({
  items,
  selectedItems,
  onValueChange,
  onQuantitiesChange,
  onFocus,
}: MultiSelectProps) => {
  const { ConfigRepository } = useStores();
  const [modalVisible, setModalVisible] = useState(false);
  const [tempSelected, setTempSelected] = useState<Set<string>>(
    () => new Set(selectedItems || [])
  );
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  useEffect(() => {
    setTempSelected(new Set(selectedItems || []));
  }, [selectedItems]);

  const handleOpenModal = () => {
    if (onFocus) onFocus();
    setTempSelected(new Set(selectedItems || []));
    setCollapsedCategories(
      items.reduce<Record<string, boolean>>((categories, category) => {
        categories[category.id] = true;
        return categories;
      }, {})
    );
    setModalVisible(true);
  };

  const toggleCategory = useCallback((catId: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  }, []);

  const toggleSelectProduct = useCallback((productId: string) => {
    setQuantities((prev) =>
      prev[productId] ? prev : { ...prev, [productId]: "1" }
    );
    setTempSelected((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }, []);

  const selectProduct = useCallback((productId: string) => {
    setTempSelected((prev) => {
      if (prev.has(productId)) return prev;
      const next = new Set(prev);
      next.add(productId);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = Number(prev[productId] || "1");
      const next = Math.max(1, current + delta);
      return { ...prev, [productId]: String(next) };
    });
    selectProduct(productId);
  }, [selectProduct]);

  const handleDecimalInputChange = useCallback(
    (event: TextInputKeyPressEvent, productId: string) => {
      const { key } = event.nativeEvent;
      const isValidKey = /^[\d.]$/.test(key) || key === "Backspace";
      if (!isValidKey) return;

      setQuantities((prev) => {
        const number = prev[productId] || "1";
        const formatedNumber =
          key === "Backspace"
            ? formatInput(number.slice(0, -1))
            : formatInput(number + key);
        return { ...prev, [productId]: formatedNumber };
      });

      selectProduct(productId);
    },
    [selectProduct]
  );

  const setDirectQuantity = useCallback((productId: string, val: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: val === "" ? "1" : val,
    }));
    selectProduct(productId);
  }, [selectProduct]);

  const quantityColors = useMemo(() => ({
    border: ConfigRepository.color.itemListBackgroundBorder,
    primary: ConfigRepository.color.primary,
    text: ConfigRepository.color.text,
    textSecondary: ConfigRepository.color.textSecondary,
    quantityBackground: ConfigRepository.color.itemListItemOpenBackground,
  }), [ConfigRepository.color]);

  const renderCategory = useCallback((category: ITagsProductsMultiSelect) => {
    const isCollapsed = Boolean(collapsedCategories[category.id]);

    return (
      <View key={category.id} style={styles.categoryWrapper}>
        <CategoryRow
          category={category}
          isCollapsed={isCollapsed}
          color={ConfigRepository.color.text}
          onToggle={toggleCategory}
        />

        {!isCollapsed && (
          <View style={styles.productListContainer}>
            {category.children.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                isSelected={tempSelected.has(product.id)}
                quantity={quantities[product.id] || "1"}
                colors={quantityColors}
                onToggle={toggleSelectProduct}
                onQuantityDelta={updateQuantity}
                onQuantityChange={setDirectQuantity}
                onDecimalInputChange={handleDecimalInputChange}
              />
            ))}
          </View>
        )}
      </View>
    );
  }, [ConfigRepository.color.text, collapsedCategories, handleDecimalInputChange, quantityColors, quantities, setDirectQuantity, tempSelected, toggleCategory, toggleSelectProduct, updateQuantity]);

  const handleConfirm = () => {
    onValueChange(Array.from(tempSelected));
    if (onQuantitiesChange) {
      onQuantitiesChange(quantities);
    }
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const getToggleText = () => {
    if (tempSelected.size === 0) {
      return I18n.t("selectProduct") || "Selecione o produto";
    }
    return `${tempSelected.size} ${I18n.t("selectedProduct") || "produto(s) selecionado(s)"}`;
  };

  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity
        style={[
          styles.selectToggle,
          { backgroundColor: ConfigRepository.color.itemListBackground },
        ]}
        onPress={handleOpenModal}
      >
        <Text
          color={ConfigRepository.color.text}
        >
          {getToggleText()}
        </Text>
        <FontAwesome
          name="angle-down"
          size={20}
          color={ConfigRepository.color.text}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              { backgroundColor: ConfigRepository.color.backgroundPrimary },
            ]}
          >
            <View style={styles.modalHeader}>
              <Title2 color={ConfigRepository.color.text}>
                {I18n.t("selectProduct") || "Selecione os produtos"}
              </Title2>
            </View>

            <ScrollView
              style={styles.modalBody}
              contentContainerStyle={{ paddingBottom: 20 }}
              keyboardShouldPersistTaps="handled"
            >
              {items.length > 0 ? (
                items.map((category) => renderCategory(category))
              ) : (
                <Text color={ConfigRepository.color.textSecondary}>
                  {I18n.t("noProducts") || "Nenhum produto disponível"}
                </Text>
              )}
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[
                  styles.cancelBtn,
                  { backgroundColor: ConfigRepository.color.alert },
                ]}
                onPress={handleCancel}
              >
                <FontAwesome name="times" size={18} color="#FFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.confirmBtn,
                  { backgroundColor: ConfigRepository.color.primary },
                ]}
                onPress={handleConfirm}
              >
                <Text color={ConfigRepository.color.onPrimary}>
                  {I18n.t("add") || "Adicionar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
  },
  selectToggle: {
    height: 48,
    borderRadius: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "92%",
    height: "90%",
    borderRadius: 16,
    padding: 16,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  modalBody: {
    flex: 1,
    marginVertical: 12,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryWrapper: {
    width: "100%",
    overflow: "visible",
  },
  categoryHeader: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 12,
    paddingRight: 5,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.08)",
  },
  productListContainer: {
    width: "100%",
    overflow: "visible",
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
  },
  productCheckTouch: {
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  productName: {
    fontSize: 16,
    marginLeft: 12,
  },
  modalFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
  },
  cancelBtn: {
    width: 50,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmBtn: {
    flex: 1,
    height: 45,
    borderRadius: 10,
    marginLeft: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MultiSelect;
