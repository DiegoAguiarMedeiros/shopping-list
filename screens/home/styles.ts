import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View<{
  background: string;
}>`
  background: ${(props: { background: any }) => props.background};
  width: ${Dimensions.get("window").width + "px"};
  height: 100%;
`;

export const ContainerList = styled.View`
    height: 76%;
    overflow:hidden;
`;
export const ContainerListEmpty = styled.View`
    height: 75%;
    padding:1px;
    overflow:hidden;
`;
export const ContainerListEmptyInner = styled.View`
    flex: 1;
  justify-content: center;
  align-items: center;
`;
export const ListEmptyTitle = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text}; 
    font-size: 25px;
    text-align: center;
    font-weight: bold;
`;
export const ContainerTotal = styled.View<{
    border: string,
}>`
    border:1px solid ${(props: { border: any; }) => props.border};
    height: 5%;
`;
export const ContainerListInner = styled.View`
  flex: 10;
  justify-content: center;
  align-items: center;
`;
export const ContainerListInnerButton = styled.View`
    flex: 1;
    align-items: center;
`;

export const ContainerButtonAdd = styled.View`
    height: 8%;
`;