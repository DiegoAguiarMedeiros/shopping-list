import React from "react";
import * as Styled from "./styles";
import { Swipeable } from "react-native-gesture-handler";



export interface GridItemNoSwipeableProps {
  children: React.ReactNode;
}
const GridItemNoSwipeable: React.FC<GridItemNoSwipeableProps> = ({
  children
}) => {
  return (
    <Styled.Container
    >
      {children}
    </Styled.Container>
  );
};

export default GridItemNoSwipeable;
