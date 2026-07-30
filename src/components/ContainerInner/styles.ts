import styled from "styled-components/native";

export const ContainerInner = styled.View<{
  background: string;
  justify: string;
  height: string;
}>`
  width: 100%;
  height: ${(props: { height: string }) => props.height + '%'};
  background: ${(props: { background: string }) => props.background};
  justify-content: ${(props: { justify: string }) => props.justify};
  align-items: center;
`;
