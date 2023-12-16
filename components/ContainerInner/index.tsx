import React from "react";
import * as Styled from "./styles";

export interface ContainerInnerProps {
  children: React.ReactNode;
  background?: string;
  border?: string;
  radius?: boolean;

}

const ContainerInner: React.FC<ContainerInnerProps> = ({
  background,
  border,
  children,
  radius,
  ...rest
}) => {
  return (
    <Styled.ContainerInner background={background ?? ""}>
      {children}
    </Styled.ContainerInner>
  );
};

export default ContainerInner;
