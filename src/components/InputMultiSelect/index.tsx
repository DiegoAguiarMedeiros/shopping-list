import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ITagsProductsMultiSelect } from "../../Model/IProduct";
import I18n from "i18n-js";
import { useStores } from "../../context/StoreContext";
import { Title, Title2, Text, SubTitle } from "../Text";

type MultiSelectProps = {
  items: ITagsProductsMultiSelect[];
  selectedItems: string[];
  onValueChange: (itemValue: string[]) => void;
  onQuantitiesChange?: (quantities: Record<string, string>) => void;
  onFocus?: () => void;
};

const MultiSelect = ({
  items,
  selectedItems,
  onValueChange,
  onQuantitiesChange,
  onFocus,
}: MultiSelectProps) => {
  const { ConfigRepository } = useStores();
  const [modalVisible, setModalVisible] = useState(false);
  const [tempSelected, setTempSelected] = useState<string[]>(selectedItems || []);
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setTempSelected(selectedItems || []);
  }, [selectedItems]);

  const handleOpenModal = () => {
    if (onFocus) onFocus();
    setTempSelected(selectedItems || []);
    setModalVisible(true);
  };

  const toggleCategory = (catId: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const toggleSelectProduct = (productId: string) => {
    setTempSelected((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        if (!quantities[productId]) {
          setQuantities((qPrev) => ({ ...qPrev, [productId]: "1" }));
        }
        return [...prev, productId];
      }
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    const current = Number(quantities[productId] || "1");
    const next = Math.max(1, current + delta);
    setQuantities((prev) => ({
      ...prev,
      [productId]: String(next),
    }));
    if (!tempSelected.includes(productId)) {
      setTempSelected((prev) => [...prev, productId]);
    }
  };

  const setDirectQuantity = (productId: string, val: string) => {
    const cleanVal = val.replace(/\D/g, "");
    setQuantities((prev) => ({
      ...prev,
      [productId]: cleanVal === "" ? "1" : cleanVal,
    }));
    if (!tempSelected.includes(productId)) {
      setTempSelected((prev) => [...prev, productId]);
    }
  };

  const handleConfirm = () => {
    onValueChange(tempSelected);
    if (onQuantitiesChange) {
      onQuantitiesChange(quantities);
    }
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const getToggleText = () => {
    if (!tempSelected || tempSelected.length === 0) {
      return I18n.t("selectProduct") || "Selecione o produto";
    }
    return `${tempSelected.length} ${I18n.t("selectedProduct") || "produto(s) selecionado(s)"}`;
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
              {items && items.length > 0 ? (
                items.map((category) => {
                  const isCollapsed = collapsedCategories[category.id];
                  return (
                    <View key={category.id} style={styles.categoryContainer}>
                      <TouchableOpacity
                        style={styles.categoryHeader}
                        onPress={() => toggleCategory(category.id)}
                      >
                        <SubTitle color={ConfigRepository.color.text} style={{ width: 'auto' }}>
                          {category.name}
                        </SubTitle>
                        <FontAwesome
                          name={isCollapsed ? "angle-down" : "angle-up"}
                          size={22}
                          color={ConfigRepository.color.text}
                        />
                      </TouchableOpacity>

                      {!isCollapsed &&
                        category.children &&
                        category.children.map((product) => {
                          const isSelected = tempSelected.includes(product.id);
                          const qty = quantities[product.id] || "1";
                          return (
                            <View
                              key={product.id}
                              style={[
                                styles.productRow,
                                {
                                  borderColor:
                                    ConfigRepository.color.itemListBackgroundBorder,
                                },
                              ]}
                            >
                              <TouchableOpacity
                                style={styles.productCheckTouch}
                                onPress={() => toggleSelectProduct(product.id)}
                              >
                                <FontAwesome
                                  name={
                                    isSelected ? "check-square" : "square-o"
                                  }
                                  size={22}
                                  color={
                                    isSelected
                                      ? ConfigRepository.color.primary
                                      : ConfigRepository.color.textSecondary
                                  }
                                />
                                <Text
                                  color={isSelected
                                    ? ConfigRepository.color.text
                                    : ConfigRepository.color.textSecondary}
                                >
                                  {product.name}
                                </Text>
                              </TouchableOpacity>

                              <View style={styles.qtdContainer}>
                                <TouchableOpacity
                                  style={[
                                    styles.qtdBtn,
                                    {
                                      backgroundColor:
                                        ConfigRepository.color.primary,
                                    },
                                  ]}
                                  onPress={() => updateQuantity(product.id, -1)}
                                >
                                  <FontAwesome
                                    name="minus"
                                    size={12}
                                    color={ConfigRepository.color.onPrimary}
                                  />
                                </TouchableOpacity>

                                <TextInput
                                  style={[
                                    styles.qtdInput,
                                    {
                                      color: ConfigRepository.color.text,
                                      backgroundColor:
                                        ConfigRepository.color.itemListBackground,
                                    },
                                  ]}
                                  keyboardType="numeric"
                                  value={qty}
                                  onChangeText={(val) =>
                                    setDirectQuantity(product.id, val)
                                  }
                                />

                                <TouchableOpacity
                                  style={[
                                    styles.qtdBtn,
                                    {
                                      backgroundColor:
                                        ConfigRepository.color.primary,
                                    },
                                  ]}
                                  onPress={() => updateQuantity(product.id, 1)}
                                >
                                  <FontAwesome
                                    name="plus"
                                    size={12}
                                    color={ConfigRepository.color.onPrimary}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          );
                        })}
                    </View>
                  );
                })
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
  categoryHeader: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 8,
    paddingRight: 5,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.08)",
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
  qtdContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtdBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  qtdInput: {
    width: 42,
    height: 28,
    marginHorizontal: 6,
    borderRadius: 6,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    padding: 0,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000'
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
