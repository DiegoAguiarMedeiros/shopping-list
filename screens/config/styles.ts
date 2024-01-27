import styled from "styled-components/native";

export const langTouch = styled.TouchableHighlight<{
  background: string;
}>`
  background: ${(props: { background: any }) => props.background};
  padding: 5px;
`
export const SlideImage = styled.Image`
  width: 50px;
  height: 35px;
`;