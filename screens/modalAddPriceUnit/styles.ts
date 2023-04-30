import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View<{
    background: string,
}>`
    background:${(props: { background: any; }) => props.background};
    width: ${Dimensions.get('window').width};
    height: ${Dimensions.get('window').height};
    flex: 1;
    justify-content: center;
    align-items: center;
    `;


export const WrapperGrid = styled.View`
    width: 100%;
    flex: 15;
`;
export const WrapperInput = styled.View`
    display:flex;
    flex-direction: row;
    width: 100%;
    flex: 1;
    padding: 25px 5px;
`;
export const WrapperInputInner = styled.View`
    width: 100%;
    flex: 5;
`;
export const WrapperButton = styled.View`
    width: 100%;
    flex: 1;
`;