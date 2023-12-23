import styled from "styled-components/native";

export const ContainerInner = styled.View<{
  background: string;
  justify: string;
}>`
  width: 100%;
  height: 100%;
  background: ${(props: { background: string }) => props.background};
  justify-content: ${(props: { justify: string }) => props.justify};
  align-items: center;
`;
