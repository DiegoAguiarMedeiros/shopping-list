import { Animated, useColorScheme } from "react-native";

import * as Styled from "./styles";

import { useEffect, useRef } from "react";
import { colorTheme } from "../../../constants/Colors";
import { useStores } from "../../context/StoreContext";

const AnimatedBottomSheet = Animated.createAnimatedComponent(
  Styled.BottomSheet
);

export type BottomSheetProps = {
  height: "add" | "edit" | "options";
  isVisible: boolean;
  children: React.ReactNode;
};

const BottomSheet = ({
  isVisible,
  children,
  height,
}: BottomSheetProps) => {
  const animation = useRef(new Animated.Value(0))?.current;
  const { ConfigRepository } = useStores();
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [250, 0],
  });

  const heightArr = {
    add: 180,
    edit: 240,
    options: 220,
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible, animation]);
  return (
    <AnimatedBottomSheet
      style={{
        height: heightArr[height],
        backgroundColor: ConfigRepository.color.backgroundBottomSheet,
        transform: [{ translateY }],
      }}
    >
      {children}
    </AnimatedBottomSheet>
  );
};

export default BottomSheet;
