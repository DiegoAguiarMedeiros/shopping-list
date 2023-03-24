import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Button = styled.TouchableOpacity<{
  border: string,
  background: string,
}>`
  background:${(props: { background: any; }) => props.background};
  border: 1px solid ${(props: { border: any; }) => props.border};
  border-radius: 100px;
  padding: 12px 20px;
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text<{
  text: string,
}>`
  color:${(props: { text: any; }) => props.text};
  font-size: 16px;
  margin: auto;
  padding: 5px 10px;
`;