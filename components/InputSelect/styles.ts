import { Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styled, { css } from 'styled-components/native';
export const select = styled(Picker)<{
    background: string,
}>`
width: 100%;
background-color: #fff;
border: 5px solid #0f0;
border-radius: 50px;
padding: 27px;
font-size: 64px;

`;