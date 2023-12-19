import styled from "styled-components/native";

export const Item = styled.TouchableHighlight<{
  background: string;
  borderColor: string;
  height: string;
  row: boolean;
}>`
  background: ${(props: { background: string }) => props.background};
  height: ${(props: { height: string }) => props.height};
  border-radius: 15px;
  margin: 5px 0;
  width: 100%;
  display: flex;
  flex-direction: ${(props: { row: boolean }) => props.row ? "row" : "col"};
  padding: 5px;
  border: 1px solid ${(props: { borderColor: string }) => props.borderColor};
`;
export const Wrapper = styled.View<{
  width: string;
  height: string;
}>`
  width: ${(props: { width: string }) => props.width};
  height: ${(props: { height: string }) => props.height};
`;
export const WrapperRow = styled.View<{
  height: string;
}>`
  height: ${(props: { height: string }) => props.height};
  display: flex;
  flex-direction: row;
`;
export const WrapperCol = styled.View<{
  width: string;
  height: string;
}>`
  width: ${(props: { width: string }) => props.width};
  height: ${(props: { height: string }) => props.height};
`;
export const WrapperInner = styled.View<{
  width: string;
  height: string;
  justify: string;
}>`
  width: ${(props: { width: string }) => props.width};
  height: ${(props: { height: string }) => props.height};
  display: flex;
  justify-content: ${(props: { justify: string }) => props.justify};
  align-items: flex-start;
`;