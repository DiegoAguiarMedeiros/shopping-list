import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';



export const Container = styled.View<{
  background: string,
}>`
  background:${(props: { background: any; }) => props.background};
  width: 100%;
  height: 100%;
`;

export const SlideContainer = styled.View<{
  background: string,
}>`

  flex: 1;
  align-items: center;
  justify-content: center;
  `;
export const SlideContainerInnerTitle = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
  
  `;
export const SlideContainerInnerImage = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  
`;
export const SlideContainerInnerText = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
  
`;


export const SlideImage = styled.Image`
  width: 200px;
  height: 200px;
`;

export const SlideTitle = styled.Text<{
  text: string,
}>`
  color: ${(props: { text: any; }) => props.text};
  font-size: 32px;
  font-weight: bold;

`;

export const SlideText = styled.Text<{
  text: string,
}>`
  color: ${(props: { text: any; }) => props.text};
  font-size: 16px;
  margin-top: 16px;
  margin-horizontal: 32px;
  text-align: center;
`;

interface PaginationProps {
  active: boolean,
  primary: string,
  secondary: string,
}

export const PaginationContainer = styled.View`
  position:absolute;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
`;

export const Pagination = styled.View<PaginationProps>`
width: ${({ active }) => (active ? '16px' : '8px')};
height: 8px;
border-radius: 4px;
margin-horizontal: 4px;
background-color: ${({ active, primary, secondary }) =>
    active ? primary : secondary};
`;

export const DotContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const Dot = styled.View<{ isActive: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-right: 10px;
  background-color: ${(props) => (props.isActive ? "#000" : "#ccc")};
`;