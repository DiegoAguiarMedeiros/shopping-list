import React, { useState } from "react";
import { Switch as RNSwitch, useColorScheme } from "react-native";

import { Text } from "../Text";
import Container from "../Container";
import { GridItemWrapperInner, GridItemWrapperRow } from "../GridItemInner";
import { useShoppingListContext } from "../../context/ShoppingList";
import { colorTheme } from "../../../constants/Colors";

interface LabelOnOff {
  on: string;
  off: string;
}

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label: LabelOnOff;
  color: colorTheme;
}

const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  label,
  color,
}) => {
  return (
    <Container noPadding>
      <GridItemWrapperRow height={100}>
        <GridItemWrapperInner width={50} height={100} align="flex-end">
          <Text color={color.itemListItemOpenTextSecondary} align="right">
            {label[value ? "on" : "off"]}
          </Text>
        </GridItemWrapperInner>
        <GridItemWrapperInner width={50} height={100}>
          <RNSwitch
            value={value}
            onValueChange={onValueChange}
            trackColor={{
              false: color.itemListBackgroundBorder,
              true: color.primary,
            }}
            thumbColor={value ? color.white : color.primary}
          />
        </GridItemWrapperInner>
      </GridItemWrapperRow>
    </Container>
  );
};

export default Switch;
