import React, { useState } from "react";
import { Switch as RNSwitch, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import { Text } from "../Text";
import Container from "../Container";
import { GridItemWrapperInner, GridItemWrapperRow } from "../GridItemInner";

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
  return (
    <Container noPadding>
      <GridItemWrapperRow height={100} >
        <GridItemWrapperInner width={50} height={100} align="flex-end">
          <Text
            color={
              colorScheme !== "dark"
                ? Colors[colorScheme ?? "light"].black
                : Colors[colorScheme ?? "light"].white
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
              false: Colors[colorScheme ?? "light"].white,
              true: Colors[colorScheme ?? "light"].secondary,
            }}
            thumbColor={
              value
                ? Colors[colorScheme ?? "light"].white
                : Colors[colorScheme ?? "light"].secondary
            }
          />
        </GridItemWrapperInner>
      </GridItemWrapperRow>
    </Container>
  );
};

export default Switch;
