import { Animated, useColorScheme } from "react-native";

import * as Styled from "./styles";

import { useEffect, useRef } from "react";
import { useShoppingListContext } from "../../context/ShoppingList";
import { colorTheme } from "../../../constants/Colors";

const AnimatedBottomSheet = Animated.createAnimatedComponent(
  Styled.BottomSheet
);

export type BottomSheetProps = {
  height: "add" | "edit";
  isVisible: boolean;
  color: colorTheme;
  children: React.ReactNode;
};

const BottomSheet = ({
  isVisible,
  children,
  height,
  color,
}: BottomSheetProps) => {
  const animation = useRef(new Animated.Value(0)).current;

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [250, 0],
  });

  const heightArr = {
    add: 150,
    edit: 200,
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
        backgroundColor: color.backgroundBottomSheet,
        transform: [{ translateY }],
      }}
    >
      {children}
    </AnimatedBottomSheet>
  );
};

export default BottomSheet;
