import {
  useColorScheme, SafeAreaView,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import Colors from '../../constants/Colors';
import * as Styled from './styles';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { itemInterface } from '../../types/types';
import InputText from '../../components/InputText';

const itemsArr: itemInterface[] = []

export default function Modal() {
  const [newItem, setNewItem] = useState('');
  const colorScheme = useColorScheme();
  return (

    <Styled.Container background={Colors[colorScheme ?? 'light'].background}>
      <Styled.InputContainer>
        <InputText placeholder='Nome da sua lista...' onChangeText={(item) => { setNewItem(item); }} value={newItem} />
      </Styled.InputContainer>

      <Styled.ButtonsContainer>
        <Styled.ButtonWrapper>
          <Button text='Cancelar' background={Colors['light'].cancelButtonBackground} />
        </Styled.ButtonWrapper>
        <Styled.ButtonWrapper>
          <Button text='Adicionar' background={Colors['light'].buttonBackground} />
        </Styled.ButtonWrapper>
      </Styled.ButtonsContainer>

    </Styled.Container>
  );
}

