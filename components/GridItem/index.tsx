import React from "react";
import * as Styled from "./styles";
import { Swipeable } from "react-native-gesture-handler";



export interface GridItemProps {
  children: React.ReactNode;
  background?: string;
  border?: string;
  radius?: boolean;
  renderLeftActions?: (progress: any, dragX: {
    interpolate: (arg0: {
      inputRange: number[];
      outputRange: number[];
    }) => any;
  }) => React.JSX.Element;
  renderRightActions?: (progress: any, dragX: {
    interpolate: (arg0: {
      inputRange: number[];
      outputRange: number[];
    }) => any;
  }) => React.JSX.Element;
  rightThreshold: number | undefined
  leftThreshold: number | undefined
}

const GridItem: React.FC<GridItemProps> = ({
  background,
  border,
  children,
  radius,
  renderLeftActions,
  renderRightActions,
  rightThreshold,
  leftThreshold,
  ...rest
}) => {
  return (
    <Swipeable
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

export default GridItem;
