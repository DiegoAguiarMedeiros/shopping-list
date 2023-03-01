import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View<{
    background: string,
}>`
    background:${(props: { background: any; }) => props.background};
    width: ${Dimensions.get('window').width};
    height: ${Dimensions.get('window').height};
    padding:10px;
`;

export const ContainerList = styled.View`
    height: 76%;
    padding:1px;
    overflow:hidden;
`;
export const ContainerTotal = styled.View<{
    border: string,
}>`
    border:1px solid ${(props: { border: any; }) => props.border};
    height: 5%;
    padding:1px;
`;
export const ContainerButtonAdd = styled.View`
    height: 5%;
    padding:1px;
`;