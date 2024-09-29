import React from "react";
import * as Styled from "./styles";

export interface ContainerProps {
  children: React.ReactNode;
}

const ContainerCP: React.FC<ContainerProps> = ({ children }) => {
  return <Styled.Container>{children}</Styled.Container>;
};

export default ContainerCP;
