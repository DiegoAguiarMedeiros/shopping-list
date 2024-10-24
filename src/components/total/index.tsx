import I18n from "i18n-js";
import { GridItemWrapperRow, GridItemWrapperInner } from "../GridItemInner";
import { useShoppingListContext } from "../../context/ShoppingList";

import { Text } from "..//Text";
import { colorTheme } from "../../../constants/Colors";

interface TotalProps {
  color: colorTheme;
  total: number;
  un: number;
  height: number;
}
const Total = ({ color, total, un, height }: TotalProps) => {
  const { getCurrency } = useShoppingListContext();
  return (
    <GridItemWrapperRow height={height}>
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
