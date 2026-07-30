import I18n from "i18n-js";
import {
  GridItemWrapperRow,
  GridItemWrapperInner,
} from "../../../components/GridItemInner";

import { Text } from "../../../components/Text";
import { colorTheme } from "../../../../constants/Colors";
import { useStores } from "../../../context/StoreContext";

interface TotalProps {
  color: colorTheme;
  total: number;
  un: number;
}
const Total = ({ color, total, un }: TotalProps) => {
   const {   ConfigRepository } = useStores();
  return (
    <GridItemWrapperRow height={10}>
      <GridItemWrapperInner width={50} height={100} justify="flex-start" align="flex-start">
        <Text color={color.text}>
          {I18n.t("totalItems")}: {un}
        </Text>
      </GridItemWrapperInner>
      <GridItemWrapperInner width={50} height={100} justify="flex-start" align="flex-end">
        <Text color={color.text} align="right">
          {I18n.t("total")}: {ConfigRepository.currency}{" "}
          {total.toFixed(2).replace(".", ",")}
        </Text>
      </GridItemWrapperInner>
    </GridItemWrapperRow>
  );
};

export default Total;
