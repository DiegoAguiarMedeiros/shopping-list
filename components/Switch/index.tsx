import React, { useState } from "react";
import { Switch as RNSwitch, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
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

  const { getTheme } = useShoppingListContext();
  return (
    <Container noPadding>
      <GridItemWrapperRow height={100}>
        <GridItemWrapperInner width={50} height={100} align="flex-end">
          <Text
            color={
              colorScheme !== "dark"
                ? Colors[getTheme()].black
                : Colors[getTheme()].white
            }
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
              false: Colors[getTheme()].white,
              true: Colors[getTheme()].secondary,
            }}
            thumbColor={
              value ? Colors[getTheme()].white : Colors[getTheme()].secondary
            }
          />
        </GridItemWrapperInner>
      </GridItemWrapperRow>
    </Container>
  );
};

export default Switch;
