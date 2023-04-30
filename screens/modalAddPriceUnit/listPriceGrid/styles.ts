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

export const ContainerListPriceItem = styled.View`
    width:${Dimensions.get('window').width};
    flex: 1;
    height: 50%;
`;    