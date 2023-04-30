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
    padding: 15px;
    
    `;
export const Title = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text}; 
    padding: 15px;
    font-size: 26;
    width:100%;
    `;

export const InputContainer = styled.View`
    padding: 5px 15px;
    width:100%;
    flex-direction: row;
    
    `;
export const ButtonsContainer = styled.View`
    padding: 0 15px;
    width:100%;
    flex-direction: row;
    justify-content: space-between;
    
    `;

export const ButtonWrapper = styled.View`
    
    flex: 1;
`;