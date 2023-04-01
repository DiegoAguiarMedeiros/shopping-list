import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
    flex-direction: row;
    padding: 0 5px;
    align-items: center;
`;

export const Label = styled.Text<{
    color: string,
}>`
  color:${(props: { color: string; }) => props.color};
  font-size: 18px;
  margin-right: 10px;
`;