import React from "react";
import * as Styled from "./styles";

export interface ContainerProps {
  children: React.ReactNode;
  background?: string;
  border?: string;
  radius?: boolean;

}

const Container: React.FC<ContainerProps> = ({
  background,
  border,
  children,
  radius,
  ...rest
}) => {
  return (
    <Styled.Container background={background ?? "transparent"}>
      {children}
    </Styled.Container>
  );
};

export default Container;
