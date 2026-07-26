import React from "react";
import { TextInputProps, useColorScheme } from "react-native";

import * as Styled from "./styles";
import { colorTheme } from "../../../../../../../constants/Colors";
import { useStores } from "../../../../../../context/StoreContext";

interface InputProps extends TextInputProps {
  placeholder: string;
  radius: boolean;
}

const InputText: React.FC<InputProps> = ({
  placeholder,
  radius,
  ...rest
}) => {
  const { ConfigRepository } = useStores();

  return (
    <Styled.Input
      radius={radius}
      background={ConfigRepository.color.backgroundPrimary}
      color={ConfigRepository.color.text}
      placeholder={placeholder}
      placeholderTextColor={ConfigRepository.color.textSecondary}
      underlineColorAndroid="transparent"
      textAlignVertical="center"
      {...rest}
    />
  );
};

export default InputText;
