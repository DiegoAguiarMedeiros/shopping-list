import React, { useMemo, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import ListGridItem from "../../screens/product/listGridItem";
import { BottomSheetProps } from "../../components/BottomSheet";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import { IProduct } from "../../Model/IProduct";
import ITag from "../../Model/ITag";
import { useStores } from "../../context/StoreContext";
import { FontAwesome } from "@expo/vector-icons";
import { SubTitle, Text, Title2 } from "../../components/Text";
import I18n from "i18n-js";

interface ProductViewProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  products: IProduct[];
  search?: string;
}

export const ProductView = ({
  setBottomSheetProps,
  handleCloseBottomSheet,
  products,
  search = "",
}: ProductViewProps) => {
  const { TagRepository, ConfigRepository } = useStores();
  const colorScheme = useColorScheme();
  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<string, boolean>
  >({});

  const toggleCategory = (tagUuid: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [tagUuid]: !prev[tagUuid],
    }));
  };

  const categoryGroups = useMemo(() => {
    const allTags = TagRepository.tags || [];
    const map = new Map<string, { tag: ITag; products: IProduct[] }>();

    allTags.forEach((t) => {
      map.set(t.uuid, { tag: t, products: [] });
    });

    const uncategorizedProducts: IProduct[] = [];

    products.forEach((product) => {
      let matched = false;
      if (product.tag) {
        for (const [uuid, group] of map.entries()) {
          if (product.tag === uuid || product.tag === group.tag.name) {
            group.products.push(product);
            matched = true;
            break;
          }
        }
      }
      if (!matched) {
        uncategorizedProducts.push(product);
      }
    });

    const result: Array<{ tag: ITag; products: IProduct[] }> = [];

    map.forEach((group) => {
      result.push(group);
    });

    if (uncategorizedProducts.length > 0) {
      result.push({
        tag: {
          uuid: "uncategorized",
          name: I18n.t("noCategories") || "Sem Categoria",
          productsQTD: uncategorizedProducts.length,
        },
        products: uncategorizedProducts,
      });
    }

    // When searching, hide tag groups that have no matching products
    if (search.trim() !== "") {
      return result.filter((group) => group.products.length > 0);
    }

    return result;
  }, [products, TagRepository.tags, search]);

  return (
    <Container background={ConfigRepository.color.backgroundPrimary} style={{ paddingTop: 0 }}>
      <ContainerInner background={ConfigRepository.color.backgroundPrimary}>
        <ScrollView
          style={{ flex: 1, width: "100%" }}
          contentContainerStyle={{ width: "100%", paddingVertical: 8 }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              width: "100%",
              backgroundColor: ConfigRepository.color.backgroundPrimary,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {categoryGroups.map(({ tag, products: categoryProducts }, index) => {
              const isExpanded = !collapsedCategories[tag.uuid];
              const isLast = index === categoryGroups.length - 1;

              return (
                <View key={"CategoryAccordion-" + tag.uuid} style={{ width: "100%" }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => toggleCategory(tag.uuid)}
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
                      <Title2 color={ConfigRepository.color.text}>
                        {tag.name}
                      </Title2>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <View
                        style={{
                          backgroundColor: ConfigRepository.color.primary + "20",
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 12,
                          marginRight: 8,
                        }}
                      >
                        <Text color={ConfigRepository.color.text}>
                          {categoryProducts.length} {I18n.t("products")}
                        </Text>
                      </View>
                      <FontAwesome
                        name={isExpanded ? "chevron-up" : "chevron-down"}
                        size={14}
                        color={ConfigRepository.color.text}
                      />
                    </View>
                  </TouchableOpacity>

                  {isExpanded && (
                    <View
                      style={{
                        width: "100%",
                        paddingHorizontal: 16,
                        paddingBottom: categoryProducts.length > 0 ? 8 : 0,
                      }}
                    >
                      {categoryProducts.map((item) => (
                        <ListGridItem
                          key={"ListGridItem-" + item.uuid}
                          handleCloseBottomSheet={handleCloseBottomSheet}
                          setBottomSheetProps={setBottomSheetProps}
                          item={item}
                        />
                      ))}
                    </View>
                  )}

                  {!isLast && (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: ConfigRepository.color.itemListBackgroundBorder || "rgba(255, 255, 255, 0.1)",
                        marginTop: 8,
                        width: "100%",
                      }}
                    />
                  )}
                </View>
              );
            })}
          </View>
          <View style={{ width: "100%", height: 250 }} />
        </ScrollView>
      </ContainerInner>
    </Container>
  );
};
