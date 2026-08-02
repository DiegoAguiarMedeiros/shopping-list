import React, { useState } from "react";
import { Switch as RNSwitch, useColorScheme } from "react-native";

import { Text } from "../Text";
import Container from "../Container";
import { GridItemWrapperInner, GridItemWrapperRow } from "../GridItemInner";
import { colorTheme } from "../../../constants/Colors";
import { useStores } from "../../context/StoreContext";

interface LabelOnOff {
  on: string;
  off: string;
}

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label: LabelOnOff;
}

const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  label,
}) => {
  const { ConfigRepository } = useStores();
  return (
    <Container noPadding>
      <GridItemWrapperRow >
        <GridItemWrapperInner width={50} align="flex-end">
          <Text color={ConfigRepository.color.itemListItemOpenTextSecondary} align="right">
            {label[value ? "on" : "off"]}
          </Text>
        </GridItemWrapperInner>
        <GridItemWrapperInner width={50} >
          <RNSwitch
            value={value}
            onValueChange={onValueChange}
            trackColor={{
              false: ConfigRepository.color.switchTrackColorFalse,
              true: ConfigRepository.color.switchTrackColorTrue,
            }}
            thumbColor={
              value ? ConfigRepository.color.switchThumbColorTrue : ConfigRepository.color.switchThumbColorFalse
            }
          />
        </GridItemWrapperInner>
      </GridItemWrapperRow>
    </Container>
  );
};

export default Switch;
