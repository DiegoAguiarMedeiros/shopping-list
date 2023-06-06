import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
    width: ${Dimensions.get('window').width + 'px'};
    flex: 1;
    padding: 25px 0;
    `;

export const BottomSheet = styled.View`
position: absolute;
bottom: 0;
left: 0;
right: 0;
border-top-left-radius: 20px;
border-top-right-radius: 20px;

`;
export const InputContainer = styled.View`

    padding: 5px 15px;
    width:100%;
    height:65px;
    flex-direction: row;
    `;
export const ButtonsContainer = styled.View`
    padding: 0 15px;
    width:100%;
    height:45px;
    flex-direction: row;
    justify-content: space-between;
    
    `;

export const ButtonWrapper = styled.View`
    
    flex: 1;
`;