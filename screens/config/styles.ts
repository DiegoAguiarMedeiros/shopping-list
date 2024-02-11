import styled from "styled-components/native";

export const langTouch = styled.TouchableHighlight<{
  background: string;
}>`
  background: ${(props: { background: any }) => props.background};
  padding: 5px;
`
export const SlideImage = styled.Image`
  width: 40px;
  height: 30px;
`;
export const Color = styled.View<{
  background: string;
}>`

background: ${(props: { background: any }) => props.background};
  width: 40px;
  height: 30px;
`;