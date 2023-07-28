import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View<{
    background: string,
}>`
    background:${(props: { background: any; }) => props.background};
    width: ${Dimensions.get('window').width + 'px'};
    height: ${Dimensions.get('window').height + 'px'};
    flex: 1;
    justify-content: flex-start;
`;
export const Title = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text}; 
    padding: 15px;
    font-size: 26px;
    width:100%;
`;

export const ContainerHeader = styled.View`
    width:100%;
    flex: 1;
    flex-direction: row;
    align-items: center;
    padding: 15px 0 0 0;
    `;
export const ContainerBody = styled.View`
    width:100%;
    flex: 6;
    flex-direction: row;
    align-items: center;
    `;
export const ContainerHeaderInnerIconBack = styled.View`
  width:15%;
  justify-content: center;
  align-items: center;
  
  `;
export const ContainerHeaderInnerText = styled.View`
  width:75%;
  justify-content: center;
  align-items: center;
  
  `;
export const ContainerHeaderInnerProgress = styled.View`
  
    width:25%;
  justify-content: center;
  align-items: center;
  
  `;
export const ContainerHeaderInnerFilterButtons = styled.View`
  
    width:100%;
    height: 50px;
  justify-content: center;
  align-items: center;
  
  `;
export const ListTitle = styled.Text<{
    text: string,
}>`
    
    color:${(props: { text: any; }) => props.text}; 
    font-size: 25px;
    text-align: center;
    font-weight: bold;
`;