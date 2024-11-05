
import { useColorScheme } from "react-native";
import * as Styled from "./styles";

import { Text } from "../../../../../../components/Text";
import Container from "../../../../../../components/Container";
import I18n from "i18n-js";
import { colorTheme } from "../../../../../../../constants/Colors";
import { useStores } from "../../../../../../context/StoreContext";
interface AveragePriceProps {
  price: string[];
}

export default function AveragePrice({
  price,
}: Readonly<AveragePriceProps>) {
  const { ConfigRepository } = useStores();
  const calculateAveragePrice = (items: string[]): number => {
    const prices: number[] = items.map((item) => Number(item));
    if (prices.length === 0) {
      return 0; // Return 0 for an empty array, or handle this case differently
    }
    const sum = prices.reduce((total, price) => total + price, 0);
    const average = sum / prices.length;
    return average;
  };

  return (
    <>
      <Text color={ConfigRepository.color.textSecondary} align="right">
        {I18n.t("averagePrice")}
      </Text>
      <Text align="right" color={ConfigRepository.color.itemProductListAveragePrice}>
        {ConfigRepository.currency}{" "}
        {calculateAveragePrice(price).toFixed(2).replace(".", ",")}
      </Text>
    </>
  );
}
