import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Button = styled.TouchableOpacity<{
  border: string,
  background: string,
  invertSide: boolean,
}>`
  background:${(props: { background: any; }) => props.background};
  border: 1px solid ${(props: { border: any; }) => props.border};
  ${((props: { invertSide: any; }) => props.invertSide ?
    'border-top-left-radius: 100px; border-bottom-left-radius: 100px;'
    :
    'border-top-right-radius: 100px; border-bottom-right-radius: 100px;'
  )}
  
  padding: 5px 5px;
  flex-direction: row;
  align-items: center;
  height: 100%;
  justify-content: center;
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