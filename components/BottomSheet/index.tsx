import { Animated, useColorScheme } from "react-native";

import * as Styled from "./styles";
import Colors from "../../constants/Colors";
import { useEffect, useRef } from "react";
import { useShoppingListContext } from "../../context/ShoppingList";

const AnimatedBottomSheet = Animated.createAnimatedComponent(
  Styled.BottomSheet
);

export type BottomSheetProps = {
  height: "add" | "edit";
  isVisible: boolean;
  children: React.ReactNode;
};

const BottomSheet = ({ isVisible, children, height }: BottomSheetProps) => {
  const colorScheme = useColorScheme();

  const { getTheme } = useShoppingListContext();
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
        backgroundColor: Colors[getTheme()].backgroundBottomSheet,
        transform: [{ translateY }],
      }}
    >
      {children}
    </AnimatedBottomSheet>
  );
};

export default BottomSheet;
