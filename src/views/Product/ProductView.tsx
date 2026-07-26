import React, { useMemo, useState } from "react";
import {
  View,
  ScrollView,
  useColorScheme,
} from "react-native";
import ListGridItem from "../../screens/product/list/listGrid/listGridItem";
import { BottomSheetProps } from "../../components/BottomSheet";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import { IProduct } from "../../Model/IProduct";
import ITag from "../../Model/ITag";
import { useStores } from "../../context/StoreContext";
import { observer } from "mobx-react-lite";
import { FontAwesome } from "@expo/vector-icons";
import { SubTitle, Title2 } from "../../components/Text";
import {
  GridItemInner,
  GridItemWrapperCol,
  GridItemWrapperInner,
} from "../../components/GridItemInner";
import I18n from "i18n-js";

interface ProductViewProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  products: IProduct[];
}

export const ProductView = ({
  setBottomSheetProps,
  handleCloseBottomSheet,
  products,
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
        if (group.products.length > 0) {
          result.push(group);
        }
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

      return result;
    }, [products, TagRepository.tags]);

    return (
      <Container background={ConfigRepository.color.backgroundPrimary}>
        <ContainerInner background={ConfigRepository.color.backgroundPrimary}>
          <ScrollView
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{ width: "100%" }}
            keyboardShouldPersistTaps="handled"
          >
            {categoryGroups.map(({ tag, products: categoryProducts }) => {
              const isExpanded = !collapsedCategories[tag.uuid];

              return (
                <View
                  key={"CategoryAccordion-" + tag.uuid}
                  style={{ width: "100%", marginBottom: 12 }}
                >
                  <GridItemInner
                    underlayColor={
                      ConfigRepository.color.itemListBackgroundUnderlay
                    }
                    borderColor={
                      isExpanded
                        ? ConfigRepository.color.primary
                        : ConfigRepository.color.itemListBackgroundBorder
                    }
                    background={ConfigRepository.color.itemListBackground}
                    height={56}
                    row
                    onPress={() => toggleCategory(tag.uuid)}
                    elevation={colorScheme === "light"}
                  >
                    <>
                      <GridItemWrapperCol width={55} height={100}>
                        <GridItemWrapperInner height={100} align="flex-start" justify="center">
                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <FontAwesome
                              name="tag"
                              size={13}
                              color={ConfigRepository.color.primary}
                              style={{ marginRight: 8 }}
                            />
                            <Title2 color={ConfigRepository.color.text}>
                              {tag.name}
                            </Title2>
                          </View>
                        </GridItemWrapperInner>
                      </GridItemWrapperCol>
                      <GridItemWrapperCol width={45} height={100}>
                        <GridItemWrapperInner
                          height={100}
                          justify="center"
                          align="flex-end"
                        >
                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View
                              style={{
                                backgroundColor:
                                  ConfigRepository.color.primary + "20",
                                paddingHorizontal: 8,
                                paddingVertical: 4,
                                borderRadius: 12,
                                marginRight: 8,
                              }}
                            >
                              <SubTitle
                                color={ConfigRepository.color.primary}
                                align="center"
                              >
                                {categoryProducts.length}{" "}
                                {I18n.t("products")}
                              </SubTitle>
                            </View>
                            <FontAwesome
                              name={isExpanded ? "chevron-up" : "chevron-down"}
                              size={13}
                              color={ConfigRepository.color.primary}
                            />
                          </View>
                        </GridItemWrapperInner>
                      </GridItemWrapperCol>
                    </>
                  </GridItemInner>

                  {isExpanded && (
                    <View
                      style={{
                        width: "100%",
                        paddingLeft: 10,
                        borderLeftWidth: 2,
                        borderLeftColor:
                          ConfigRepository.color.primary + "40",
                        marginTop: 6,
                        marginBottom: 4,
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
                </View>
              );
            })}
            <View style={{ width: "100%", height: 250 }} />
          </ScrollView>
        </ContainerInner>
      </Container>
    );
  };

