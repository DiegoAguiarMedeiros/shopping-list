import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: row;
`;

export const ContainerMinusPlus = styled.View`
    flex: 2;
    padding: 0;
`;
export const ContainerQtd = styled.View<{ background: string }>`
    background: ${(props) => props.background};
    height: 100%;
    padding-right: 1px;
    flex: 2;
    overflow: hidden;
`;

export const Button = styled.TouchableHighlight<{
    border: string,
    background: string,
}>`
    background:${(props: { background: any; }) => props.background};
    border: 1px solid ${(props: { border: any; }) => props.border};
    border-radius: 100px;
    padding: 5px 15px;
    flex-direction: row;
    align-items: center;
    height: 100%;
    justify-content: center;
      align-items: center;
  `;
