import React from "react";
import * as Styled from "./styles";

export interface ContainerProps {
  children: React.ReactNode;
  background?: string;
  border?: string;
  height?: string;
  radius?: boolean;
  noPadding?: boolean;
  elevation?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  background,
  border,
  children,
  radius,
  noPadding,
  height,
  elevation,
  ...rest
}) => {
  return (
    <Styled.Container background={background ?? "transparent"} noPadding={noPadding ?? false} height={height ?? "100%"} elevation={elevation ? 24 : 0}>
      {children}
    </Styled.Container>
  );
};

export default Container;
