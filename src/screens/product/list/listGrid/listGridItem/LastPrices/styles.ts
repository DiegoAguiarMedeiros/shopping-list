import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const ButtonContainer = styled.TouchableHighlight`
    padding:2px;
    margin: 0;
`;

export const ButtonText = styled.View<{
  border: string;
}>`
  border: 1px solid ${(props: { border: string }) => props.border};
  border-radius:10px;
  padding: 4px 10px;
  margin: 5px 5px 0 0;
`;