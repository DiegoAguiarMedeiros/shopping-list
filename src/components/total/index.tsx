import I18n from "i18n-js";
import { GridItemWrapperRow, GridItemWrapperInner } from "../GridItemInner";
import { DimensionValue } from "react-native";

import { Text } from "..//Text";
import { colorTheme } from "../../../constants/Colors";
import { useStores } from "../../context/StoreContext";

interface TotalProps {
  total: number;
  un: number;
  height: DimensionValue;
}
const Total = ({ total, un, height }: TotalProps) => {
  const { ConfigRepository } = useStores();
  return (
    <GridItemWrapperRow height={height}>
      <GridItemWrapperInner width="50%" justify="flex-start" align="flex-start">
        <Text color={ConfigRepository.color.text}>
          {I18n.t("totalItems")}: {un}
        </Text>
      </GridItemWrapperInner>
      <GridItemWrapperInner width="50%" justify="flex-start" align="flex-end">
        <Text color={ConfigRepository.color.text} align="right">
          {I18n.t("total")}: {ConfigRepository.currency}{" "}
          {total.toFixed(2).replace(".", ",")}
        </Text>
      </GridItemWrapperInner>
    </GridItemWrapperRow>
  );
};

export default Total;
