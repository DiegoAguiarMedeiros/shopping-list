import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../../../../components/Text";
import I18n from "i18n-js";
import { useStores } from "../../../../context/StoreContext";
import { FlashList } from "@shopify/flash-list";

interface LastPricesProps {
  lastPrices: string[];
}

const LastPrices = ({ lastPrices }: LastPricesProps) => {
  const { ConfigRepository } = useStores();
  const renderButton = (item: any) => {
    return (
      <View style={styles.buttonContainer}>
        <View style={[styles.buttonText, { borderColor: ConfigRepository.color.itemProductListLastPriceButtonBorder }]}>
          <Text color={ConfigRepository.color.itemProductListLastPriceButtonText}>
            {ConfigRepository.currency} {Number(item.item).toFixed(2).replace(".", ",")}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text color={ConfigRepository.color.textSecondary}>{I18n.t("latestPrices")}</Text>
      <FlashList
        horizontal
        data={lastPrices}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderButton}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  buttonContainer: {
    padding: 2,
    margin: 0,
  },
  buttonText: {
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 5,
    marginRight: 5,
    marginBottom: 0,
    marginLeft: 0,
  },
});

export default LastPrices;
