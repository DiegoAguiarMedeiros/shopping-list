import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import type { SharedValue } from "react-native-reanimated";
import type { SwipeableMethods } from "react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

export interface GridItemProps {
  children: React.ReactNode;
  background?: string;
  border?: string;
  radius?: boolean;
  renderLeftActions?: (
    progress: SharedValue<number>,
    translation: SharedValue<number>,
    swipeableMethods: SwipeableMethods
  ) => React.ReactNode;
  renderRightActions?: (
    progress: SharedValue<number>,
    translation: SharedValue<number>,
    swipeableMethods: SwipeableMethods
  ) => React.ReactNode;
  rightThreshold: number | undefined;
  leftThreshold: number | undefined;
}

const GridItem: React.ForwardRefRenderFunction<any, GridItemProps> = (
  {
    background,
    children,
    radius,
    renderLeftActions,
    renderRightActions,
    rightThreshold,
    leftThreshold,
    ...rest
  },
  ref
) => {
  const swipeableRef = useRef<SwipeableMethods>(null);

  useImperativeHandle(ref, () => ({
    handleCloseSwipeable: () => {
      if (swipeableRef?.current) {
        swipeableRef?.current.close();
      }
    },
  }));

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions ?? undefined}
      renderLeftActions={renderLeftActions ?? undefined}
      rightThreshold={rightThreshold ?? undefined}
      leftThreshold={leftThreshold ?? undefined}
      overshootRight={false}
      overshootLeft={false}
    >
      {children}
    </Swipeable>
  );
};

export default forwardRef(GridItem);