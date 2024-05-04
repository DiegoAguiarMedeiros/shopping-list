import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
    height: 100%;
    flex: 1;
    justify-content: center;
    align-items: center;
    `;

export const ContainerListPriceItem = styled.View`
    width: ${Dimensions.get('window').width + 'px'};
    flex: 1;
    padding: 0px 30px;
`;    