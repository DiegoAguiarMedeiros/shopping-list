
import { useColorScheme } from "react-native";
import * as Styled from "./styles";

import { Text } from "../../../../../../components/Text";
import Container from "../../../../../../components/Container";
import { ILastPrices } from "../../../../../../Domain/Model/IProduct";
import { useShoppingListContext } from "../../../../../../context/ShoppingList";
import I18n from "i18n-js";
import { colorTheme } from "../../../../../../../constants/Colors";
interface AveragePriceProps {
  price: string[];
  color: colorTheme;
}

export default function AveragePrice({
  price,
  color,
}: Readonly<AveragePriceProps>) {
  const { getCurrency } = useShoppingListContext();
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
      <Text color={color.textSecondary} align="right">
        {I18n.t("averagePrice")}
      </Text>
      <Text align="right" color={color.itemProductListAveragePrice}>
        {getCurrency()}{" "}
        {calculateAveragePrice(price).toFixed(2).replace(".", ",")}
      </Text>
    </>
  );
}
