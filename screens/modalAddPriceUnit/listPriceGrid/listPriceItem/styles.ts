import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View<{
    background: string,
}>`
    background:${(props: { background: any; }) => props.background};
    width: 100%;
    height: 60px;
    padding: 5px 0;
    display:flex;
    flex-direction: row;
`;

export const ContainerPrice = styled.View`
    flex: 2;
`;
export const ContainerQtd = styled.View`
    padding: 4px 0;
    flex: 2;
`;
export const ContainerInput = styled.View`
    flex: 2;
    justify-content: center;
    align-items: center;
`;
export const ContainerTrash = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
export const Price = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text};
    font-size: 16px;
    margin: auto;
    padding: 5px 10px;
    
  `;