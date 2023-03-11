import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View<{
    background: string,
}>`
    background:${(props: { background: any; }) => props.background};
`;

export const listItem = styled.View<{
    border: string,
    background: string,
}>`
    background:${(props: { background: any; }) => props.background};
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const TotalView = styled.View`
    width: 55%;
`;
export const TotalPriceView = styled.View`
    width: 45%;
`;

export const Text = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text};
    width: 70%;
    padding:10px;
`;
