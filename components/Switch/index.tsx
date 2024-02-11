import React, { useState } from "react";
import { Switch as RNSwitch, useColorScheme } from "react-native";

import { Text } from "../Text";
import Container from "../Container";
import { GridItemWrapperInner, GridItemWrapperRow } from "../GridItemInner";
import { useShoppingListContext } from "../../context/ShoppingList";

interface LabelOnOff {
  on: string;
  off: string;
}

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label: LabelOnOff;
}

const Switch: React.FC<SwitchProps> = ({ value, onValueChange, label }) => {
  const colorScheme = useColorScheme();

  const { getTheme, getColor } = useShoppingListContext();
  return (
    <Container noPadding>
      <GridItemWrapperRow height={100}>
        <GridItemWrapperInner width={50} height={100} align="flex-end">
          <Text
            color={colorScheme !== "dark" ? getColor().black : getColor().white}
            align="right"
          >
            {label[value ? "on" : "off"]}
          </Text>
        </GridItemWrapperInner>
        <GridItemWrapperInner width={50} height={100}>
          <RNSwitch
            value={value}
            onValueChange={onValueChange}
            trackColor={{
              false: getColor().white,
              true: getColor().secondary,
            }}
            thumbColor={value ? getColor().white : getColor().secondary}
          />
        </GridItemWrapperInner>
      </GridItemWrapperRow>
    </Container>
  );
};

export default Switch;
