import React from "react";
import * as Styled from "./styles";

export interface ContainerInnerProps {
  children: React.ReactNode;
  background?: string;
  justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  height?: string;
}

const ContainerInner: React.FC<ContainerInnerProps> = ({
  background,
  children,
  justify,
  height
}) => {
  return (
    <Styled.ContainerInner height={height ?? "100"} justify={justify ?? "flex-start"} background={background ?? "transparent"}>
      {children}
    </Styled.ContainerInner>
  );
};

export default ContainerInner;
