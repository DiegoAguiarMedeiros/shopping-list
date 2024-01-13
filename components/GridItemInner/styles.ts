import styled from "styled-components/native";

export const Item = styled.TouchableHighlight<{
  background: string;
  borderColor: string;
  height: string;
  row: boolean;
  noMargin: boolean;
  noPadding: boolean;
}>`
  background: ${(props: { background: string }) => props.background};
  height: ${(props: { height: string }) => props.height};
  border-radius: 15px;
  margin: ${(props: { noMargin: boolean }) => props.noMargin ? "0px" : "5px 0;"}; 
  width: 100%;
  display: flex;
  flex-direction: ${(props: { row: boolean }) => props.row ? "row" : "col"};
  padding: ${(props: { noPadding: boolean }) => props.noPadding ? "0px" : "5px 10px;"}; 
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
  justify: string;
  maxHeight: string;
}>`
  width: 100%;
  height: ${(props: { height: string }) => props.height};
  max-height: ${(props: { maxHeight: string }) => props.maxHeight};
  justify-content: ${(props: { justify: string }) => props.justify};
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
`;
export const WrapperCol = styled.View<{
  width: string;
  height: string;
  justify: string;
}>`
  width: ${(props: { width: string }) => props.width};
  height: ${(props: { height: string }) => props.height};
  justify-content: ${(props: { justify: string }) => props.justify};
  flex-direction: column;
`;
export const WrapperInner = styled.View<{
  width: string;
  height: string;
  justify: string;
  align: string;
}>`
  width: ${(props: { width: string }) => props.width};
  height: ${(props: { height: string }) => props.height};
  display: flex;
  justify-content: ${(props: { justify: string }) => props.justify};
  align-items: ${(props: { align: string }) => props.align};
`;