import React from "react";
import * as Styled from "./styles";

export interface ContainerInnerProps {
  children: React.ReactNode;
  background?: string;
  justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  border?: string;
  radius?: boolean;

}

const ContainerInner: React.FC<ContainerInnerProps> = ({
  background,
  border,
  children,
  radius,
  justify,
}) => {
  return (
    <Styled.ContainerInner justify={justify ?? "flex-start"} background={background ?? "transparent"}>
      {children}
    </Styled.ContainerInner>
  );
};

export default ContainerInner;
