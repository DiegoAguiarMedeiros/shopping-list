import { Animated, KeyboardAvoidingView } from "react-native";
import { useEffect, useRef } from "react";
import { useStores } from "../../context/StoreContext";
import useKeyboard from "../../hooks/useKeyboard";

const AnimatedBottomSheet = ({ children, style }: { children: React.ReactNode; style: any }) => {
  return (
    <Animated.View style={[style, { borderTopLeftRadius: 20, borderTopRightRadius: 20 }]}>
      {children}
    </Animated.View>
  );
}

export type BottomSheetProps = {
  height: "add" | "addCategory" | "edit" | "options" | "addProduct";
  isVisible: boolean;
  children: React.ReactNode;
};

const BottomSheet = ({
  isVisible,
  children,
  height,
}: BottomSheetProps) => {
  const animation = useRef(new Animated.Value(0))?.current;
  const isKeyboardVisible = useKeyboard();
  const { ConfigRepository } = useStores();
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [250, 0],
  });

  const heightArr = {
    add: 176,
    edit: 238,
    options: 178,
    addProduct: 238,
    addCategory: 176,
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible, animation]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        position: "absolute",
        bottom: 100,
        left: 0,
        right: 0,
      }}
    >
      <AnimatedBottomSheet
        style={{
          height: heightArr[height],
          backgroundColor: ConfigRepository.color.backgroundBottomSheet,
          transform: [{ translateY }],
        }}
      >
        {children}
      </AnimatedBottomSheet>
    </KeyboardAvoidingView>
  );
};

export default BottomSheet;
