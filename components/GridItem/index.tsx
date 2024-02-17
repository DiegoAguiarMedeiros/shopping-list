import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import * as Styled from "./styles";
import { Swipeable } from "react-native-gesture-handler";

export interface GridItemProps {
  children: React.ReactNode;
  background?: string;
  border?: string;
  radius?: boolean;
  renderLeftActions?: (
    progress: any,
    dragX: {
      interpolate: (arg0: {
        inputRange: number[];
        outputRange: number[];
      }) => any;
    }
  ) => React.JSX.Element;
  renderRightActions?: (
    progress: any,
    dragX: {
      interpolate: (arg0: {
        inputRange: number[];
        outputRange: number[];
      }) => any;
    }
  ) => React.JSX.Element;
  rightThreshold: number | undefined;
  leftThreshold: number | undefined;
}

const GridItem: React.ForwardRefRenderFunction<any, GridItemProps> = (
  {
    background,
    border,
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
  const swipeableRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    handleCloseSwipeable: () => {
      console.log("useImperativeHandle", swipeableRef);
      if (swipeableRef.current) {
        swipeableRef.current.close();
      }
    },
  }));

  return (
    <Swipeable
      ref={swipeableRef}
      containerStyle={{ padding: 1 }}
      renderRightActions={renderRightActions ?? undefined}
      renderLeftActions={renderLeftActions ?? undefined}
      rightThreshold={rightThreshold ?? undefined}
      leftThreshold={leftThreshold ?? undefined}
    >
      {children}
    </Swipeable>
  );
};

export default forwardRef(GridItem);
