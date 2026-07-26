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
export const ApplyColorButton = styled.TouchableOpacity<{
  background: string;
  disabledBackground: string;
}>`
  width: 90%;
  height: 38px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: ${(props) => props.disabled ? props.disabledBackground : props.background};
`;

export const ApplyColorText = styled.Text<{
  color: string;
}>`
  color: ${(props) => props.color};
  font-size: 14px;
  font-family: InterSemiBold;
`;
