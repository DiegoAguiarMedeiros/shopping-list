
import { useColorScheme } from "react-native";
import * as Styled from "./styles";

import { Text } from "../../../../../../components/Text";
import Container from "../../../../../../components/Container";
import { ILastPrices } from "../../../../../../Domain/Model/IProduct";
import { useShoppingListContext } from "../../../../../../context/ShoppingList";
import I18n from "i18n-js";
interface AveragePriceProps {
  price: string[];
}

export default function AveragePrice({ price }: Readonly<AveragePriceProps>) {
  const colorScheme = useColorScheme();

  const { getTheme, getCurrency, getColor } = useShoppingListContext();
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
      <Text color={getColor().textSecondary} align="right">
        {I18n.t("averagePrice")}
      </Text>
      <Text align="right" color={getColor().itemProductListAveragePrice}>
        {getCurrency()}{" "}
        {calculateAveragePrice(price).toFixed(2).replace(".", ",")}
      </Text>
    </>
  );
}
