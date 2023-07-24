import styled, { css } from 'styled-components/native';

export const Button = styled.TouchableOpacity<{
  border: string,
  background: string,
  height: string,
}>`
  background:${(props: { background: any; }) => props.background};
  border: 1px solid ${(props: { border: any; }) => props.border};
  border-radius: 100px;
  padding: 5px 10px;
  flex-direction: row;
  align-items: center;
  height: ${(props: { height: any; }) => props.height};
  min-height: 35px;
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