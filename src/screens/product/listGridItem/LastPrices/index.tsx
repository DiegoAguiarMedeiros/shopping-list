import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "../../../../components/Text";
import I18n from "i18n-js";
import { useStores } from "../../../../context/StoreContext";

interface LastPricesProps {
  lastPrices: string[];
}

const LastPrices = ({ lastPrices }: LastPricesProps) => {
  const { ConfigRepository } = useStores();

  return (
    <View style={styles.container}>
      <Text color={ConfigRepository.color.textSecondary}>{I18n.t("latestPrices")}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {lastPrices.map((price, index) => (
          <View key={index} style={styles.buttonContainer}>
            <View style={[styles.buttonText, { borderColor: ConfigRepository.color.itemProductListLastPriceButtonBorder }]}>
              <Text color={ConfigRepository.color.text}>
                {ConfigRepository.currency} {Number(price).toFixed(2).replace(".", ",")}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  scrollView: {
    width: "100%",
  },
  scrollContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
  },
  buttonContainer: {
    paddingRight: 6,
  },
  buttonText: {
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
});

export default LastPrices;
