import React, { useCallback, useMemo, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import ListGridItem from "../../screens/product/listGridItem";
import { BottomSheetProps } from "../../components/BottomSheet";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import { IProduct } from "../../Model/IProduct";
import ITag from "../../Model/ITag";
import { useStores } from "../../context/StoreContext";
import { FontAwesome } from "@expo/vector-icons";
import { Text, Title2 } from "../../components/Text";
import I18n from "i18n-js";
import { observer } from "mobx-react-lite";
import Button from "../../components/Button";
import ButtonsContainer from "../../components/ButtonsContainer";
import ButtonWrapper from "../../components/ButtonWrapper";
import NewTagForm from "../../components/NewTagForm";

interface ProductViewProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  products: IProduct[];
  search?: string;
}

type CategoryGroup = { tag: ITag; products: IProduct[] };
type ProductListItem =
  | { type: "category"; group: CategoryGroup }
  | { type: "product"; product: IProduct }
  | { type: "empty-category"; tag: ITag }
  | { type: "divider"; id: string };

type CategoryHeaderProps = {
  group: CategoryGroup;
  isExpanded: boolean;
  textColor: string;
  primaryColor: string;
  badgeTextColor: string;
  onToggle: (tagUuid: string) => void;
};

const CategoryHeader = React.memo(({
  group,
  isExpanded,
  textColor,
  primaryColor,
  badgeTextColor,
  onToggle,
}: CategoryHeaderProps) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={() => onToggle(group.tag.uuid)}
    style={{
      width: "100%",
      paddingVertical: 14,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <View style={{ flex: 1, marginRight: 8, justifyContent: "center" }}>
      <Title2 color={textColor}>{group.tag.name}</Title2>
    </View>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={{ backgroundColor: primaryColor, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginRight: 8 }}>
        <Text color={badgeTextColor}>
          {group.products.length} {I18n.t("products")}
        </Text>
      </View>
      <FontAwesome name={isExpanded ? "chevron-up" : "chevron-down"} size={14} color={textColor} />
    </View>
  </TouchableOpacity>
));

type EmptyCategoryProps = {
  tag: ITag;
  textColor: string;
  addTextColor: string;
  addBorder: string;
  addBackground: string;
  alertColor: string;
  onEdit: (tag: ITag) => void;
  onDelete: (tagUuid: string) => void;
};

const EmptyCategory = React.memo(({
  tag, textColor, addTextColor, addBorder, addBackground, alertColor, onEdit, onDelete,
}: EmptyCategoryProps) => (
  <View style={{ width: "100%", alignItems: "center", paddingTop: 8, paddingBottom: 16 }}>
    <Text color={textColor} style={{ marginBottom: 12, textAlign: "center" }}>
      {I18n.t("noProductsInThisCategory")}
    </Text>
    <ButtonsContainer>
      <ButtonWrapper>
        <Button text={I18n.t("edit")} icon="edit" radius textColor={addTextColor} border={addBorder} background={addBackground} onPress={() => onEdit(tag)} />
      </ButtonWrapper>
      <ButtonWrapper>
        <Button text={I18n.t("delete")} icon="trash" radius textColor="#FFFFFF" border={alertColor} background={alertColor} onPress={() => onDelete(tag.uuid)} />
      </ButtonWrapper>
    </ButtonsContainer>
  </View>
));

export const ProductView = observer(({
  setBottomSheetProps,
  handleCloseBottomSheet,
  products,
  search = "",
}: ProductViewProps) => {
  const { TagRepository, ConfigRepository } = useStores();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const handleEditCategory = useCallback((tag: ITag) => {
    setBottomSheetProps({
      height: "addCategory",
      children: <NewTagForm action="editTag" buttonText="edit" tag={tag} onClose={() => setBottomSheetProps((prev) => ({ ...prev, isVisible: false }))} />,
      isVisible: true,
    });
  }, [setBottomSheetProps]);

  const handleDeleteCategory = useCallback((uuid: string) => {
    TagRepository.removeItem(uuid);
  }, [TagRepository]);

  const toggleCategory = useCallback((tagUuid: string) => {
    setExpandedCategories((prev) => ({ ...prev, [tagUuid]: !prev[tagUuid] }));
  }, []);

  const categoryGroups = useMemo<CategoryGroup[]>(() => {
    const groupsById = new Map<string, CategoryGroup>();
    const tagIdsByName = new Map<string, string>();
    TagRepository.tags.forEach((tag) => {
      groupsById.set(tag.uuid, { tag, products: [] });
      tagIdsByName.set(tag.name, tag.uuid);
    });

    const uncategorizedProducts: IProduct[] = [];
    products.forEach((product) => {
      const tagId = groupsById.has(product.tag) ? product.tag : tagIdsByName.get(product.tag);
      const group = tagId ? groupsById.get(tagId) : undefined;
      if (group) group.products.push(product);
      else uncategorizedProducts.push(product);
    });

    const result = Array.from(groupsById.values());
    if (uncategorizedProducts.length > 0) {
      result.push({
        tag: { uuid: "uncategorized", name: I18n.t("noCategories") || "Sem Categoria", productsQTD: uncategorizedProducts.length },
        products: uncategorizedProducts,
      });
    }
    return search.trim() === "" ? result : result.filter((group) => group.products.length > 0);
  }, [products, TagRepository.tags, search]);

  const listItems = useMemo<ProductListItem[]>(() => {
    const result: ProductListItem[] = [];
    categoryGroups.forEach((group, index) => {
      result.push({ type: "category", group });
      if (expandedCategories[group.tag.uuid]) {
        if (group.products.length > 0) group.products.forEach((product) => result.push({ type: "product", product }));
        else result.push({ type: "empty-category", tag: group.tag });
      }
      if (index < categoryGroups.length - 1) result.push({ type: "divider", id: group.tag.uuid });
    });
    return result;
  }, [categoryGroups, expandedCategories]);

  const colors = useMemo(() => ({
    background: ConfigRepository.color.backgroundPrimary,
    text: ConfigRepository.color.text,
    textSecondary: ConfigRepository.color.textSecondary,
    primary: ConfigRepository.color.primary,
    white: ConfigRepository.color.white,
    addText: ConfigRepository.color.bottomSheetButtonAddText,
    addBorder: ConfigRepository.color.bottomSheetButtonAddBorder,
    addBackground: ConfigRepository.color.bottomSheetButtonAddBackground,
    alert: ConfigRepository.color.alert,
    divider: ConfigRepository.color.itemListBackgroundBorder || "rgba(255, 255, 255, 0.1)",
  }), [ConfigRepository.color]);

  const renderItem = useCallback<ListRenderItem<ProductListItem>>(({ item }) => {
    switch (item.type) {
      case "category":
        return <CategoryHeader group={item.group} isExpanded={Boolean(expandedCategories[item.group.tag.uuid])} textColor={colors.text} primaryColor={colors.primary} badgeTextColor={colors.white} onToggle={toggleCategory} />;
      case "product":
        return <View style={{ width: "100%", paddingHorizontal: 16 }}><ListGridItem handleCloseBottomSheet={handleCloseBottomSheet} setBottomSheetProps={setBottomSheetProps} item={item.product} /></View>;
      case "empty-category":
        return <EmptyCategory tag={item.tag} textColor={colors.textSecondary} addTextColor={colors.addText} addBorder={colors.addBorder} addBackground={colors.addBackground} alertColor={colors.alert} onEdit={handleEditCategory} onDelete={handleDeleteCategory} />;
      case "divider":
        return <View style={{ height: 1, backgroundColor: colors.divider, marginTop: 8, width: "100%" }} />;
    }
  }, [colors, expandedCategories, handleCloseBottomSheet, handleDeleteCategory, handleEditCategory, setBottomSheetProps, toggleCategory]);

  return (
    <Container background={colors.background} style={{ paddingTop: 0 }}>
      <ContainerInner background={colors.background}>
        <FlashList
          style={{ flex: 1, width: "100%", backgroundColor: colors.background }}
          contentContainerStyle={{ width: "100%", paddingVertical: 8, paddingBottom: 250 }}
          keyboardShouldPersistTaps="handled"
          data={listItems}
          renderItem={renderItem}
          keyExtractor={(item) => {
            if (item.type === "category") return `category-${item.group.tag.uuid}`;
            if (item.type === "product") return `product-${item.product.uuid}`;
            if (item.type === "empty-category") return `empty-category-${item.tag.uuid}`;
            return `divider-${item.id}`;
          }}
          getItemType={(item) => item.type}
        />
      </ContainerInner>
    </Container>
  );
});

export default ProductView;
