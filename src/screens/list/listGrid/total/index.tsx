import I18n from "i18n-js";
import {
  GridItemWrapperRow,
  GridItemWrapperInner,
} from "../../../../components/GridItemInner";
import { useShoppingListContext } from "../../../../context/ShoppingList";

import { Text } from "../../../../components/Text";
import { colorTheme } from "../../../../../constants/Colors";

interface TotalProps {
  color: colorTheme;
  total: number;
  un: number;
}
const Total = ({ color, total, un }: TotalProps) => {
  const { getCurrency } = useShoppingListContext();
  return (
    <GridItemWrapperRow height={10}>
      <GridItemWrapperInner width={50} height={100} justify="flex-start">
        <Text color={color.text}>
          {I18n.t("totalItems")}: {un}
        </Text>
      </GridItemWrapperInner>
      <GridItemWrapperInner width={50} height={100} justify="flex-start">
        <Text color={color.text} align="right">
          {I18n.t("total")}: {getCurrency()}{" "}
          {total.toFixed(2).replace(".", ",")}
        </Text>
      </GridItemWrapperInner>
    </GridItemWrapperRow>
  );
};

export default Total;
